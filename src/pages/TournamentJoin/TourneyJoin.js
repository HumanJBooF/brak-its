import React from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar'
import styles from './JoinStyles';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';

class TourneyJoin extends React.Component {

    state = {
        btn: 'Join Tournament!',
        early: 'Start Tournament Early?',
        full: 'Start Tournament',
        tournament: {},
        players: [],
        redirectTo: null
    }

    componentDidMount = () => {
        this.get_tourney();
    }


    get_users = () => {
        const tourneyId = this.state.tournament.id;

        API.get_users_tournament({ id: tourneyId }).then(result => {
            console.log(result.data.users, "USERS")
            let users = result.data.users.map(user => user.signUp.id);
            this.sort_players(users)
        })
    }

    handle_click = () => {
        const userTourney = {
            username: this.props.username,
            tourneyId: this.state.tournament.id,
        }
        let checkUser = this.state.players.map(obj => obj.username.toLowerCase());
        this.join_tourney(checkUser, userTourney)
    }

    join_tourney = (checkUser, userTourney) => {

        if (checkUser.includes(userTourney.username.toLowerCase())) {
            console.log(`${userTourney.username} has already joined!`); // SWEET ALERT
        } else {
            API.join_tournament(userTourney).then(result => {
                const userObj = {
                    username: result.data.user.username,
                    id: result.data.user.uuid
                };
                this.setState({ players: [...this.state.players, userObj] });
            })
        }
    }

    get_tourney = () => {
        const { match: { params: { owner, id } } } = this.props;

        API.show_one(owner, id).then(recent => {
            const tournament = recent.data.tournament
            const users = recent.data.users
            const userArr = [];

            const tourney = {
                name: tournament.tourneyName,
                id: tournament.uuid,
                description: tournament.description,
                sizeLimit: tournament.sizeLimit,
                date: tournament.date,
                time: tournament.time,
                format: tournament.format,
                gameType: tournament.gameType,
                owner: tournament.owner,
                isActive: tournament.isActive
            }

            users.forEach(user => {
                const userObj = {
                    username: user.username,
                    id: user.uuid
                }
                userArr.push(userObj);
            })
            this.setState({
                tournament: tourney,
                players: [...this.state.players, ...userArr]
            })
        })
    }

    sort_players = players => {
        let seeds = this.seeding_order(players.length);
        console.log(seeds)
        const firstRound = [];
        const secondRound = [];
        const matchNumbersInfo = [];
        const roundsToRun = Math.ceil(Math.log2(players.length));
        const highPlayers = Math.pow(2, roundsToRun);
        const byeWeeks = highPlayers - players.length;

        let indexTracker = 0;

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundInfo = [];

            const roundSize = highPlayers / (Math.pow(2, currentRound) * 2);

            for (let currentMatch = 1; currentMatch < roundSize + 1; currentMatch++) {
                roundInfo.push(currentMatch + indexTracker)
            }

            matchNumbersInfo.push(roundInfo);

            indexTracker += roundSize
        }

        for (let i = 0; i < seeds.length; i++) {
            const seedIndex = seeds[i];

            if (seedIndex <= seeds.length - byeWeeks) {
                firstRound.push({
                    player: players[seedIndex - 1],
                    matchNum: matchNumbersInfo[0][Math.ceil((i + 1) / 2) - 1],
                    nextMatch: matchNumbersInfo[1][(Math.ceil((i + 1) / 4)) - 1],
                    boxNum: i + 1
                })
            } else {
                firstRound.push({
                    player: null,
                    matchNum: matchNumbersInfo[0][Math.ceil((i + 1) / 2) - 1],
                    nextMatch: matchNumbersInfo[1][(Math.ceil((i + 1) / 4)) - 1],
                    boxNum: i + 1
                });

                secondRound.push({
                    player: firstRound[i - 1].player,
                    matchNum: matchNumbersInfo[1][(Math.ceil((i + 1) / 4)) - 1],
                    nextMatch: matchNumbersInfo[2] ? matchNumbersInfo[2][Math.ceil((i + 1) / 8) - 1] : null,
                    boxNum: highPlayers + ((i + 1) / 2)
                })
            }
        }

        return this.get_db_ready(firstRound, secondRound);
    }

    get_db_ready = (firstRound, secondRound) => {
        const dbFirstRound = [];
        const dbSecondRound = [];

        for (let i = 0; i < firstRound.length; i += 2) {
            dbFirstRound.push({
                player1Id: firstRound[i].player,
                player2Id: firstRound[i + 1].player,
                matchNum: firstRound[i].matchNum,
                nextMatch: firstRound[i].nextMatch,
                tourneyUuid: this.state.tournament.id,
                winner: firstRound[i + 1].player === null ? firstRound[i].player : null
            })
        }
        if (secondRound) {
            for (let i = 0; i < secondRound.length; i++) {
                if (secondRound[i].boxNum % 2 === 1) {
                    dbSecondRound.push({
                        player1Id: secondRound[i].player,
                        player2Id: secondRound[i + 1]
                            ? secondRound[i + 1].boxNum % 2 === 1
                                ? null
                                : secondRound[i + 1].player
                            : null,
                        matchNum: secondRound[i].matchNum,
                        nextMatch: secondRound[i].nextMatch,
                        tourneyUuid: this.state.tournament.id
                    })
                }
            }
        }

        const matches = [...dbFirstRound, ...dbSecondRound];
        console.log(matches)
        return this.set_matches(matches)
    }

    seeding_order = tourneyplayers => {
        let players;

        if (Math.log2(tourneyplayers) % 1 === 0) {
            players = tourneyplayers
        }
        else {
            players = Math.pow(2, Math.ceil(Math.log2(tourneyplayers)))
        }

        // The rounds to run is how many times the incrementer for the seed index is incremented
        const roundsToRun = Math.log2(players);
        const seedOrder = [];

        // Starts with a 0 in the first position (sorta hacky) that way its not adding half the players + undefined in the first iteration
        let playerIndexOrder = [0];

        // Starts at 1 because math numbers !== loop numbers, to visualize what this is doing check the large commented section at the bottom of this func
        for (let round = 1; round < roundsToRun + 1; round++) {
            const tempArr = [];
            // Base is half of the players first time, then half of the previous the next, half again, etc.
            let base = players / Math.pow(2, round);

            // pushes the index into the array
            for (let playerIndex = 0; playerIndex < Math.pow(2, round - 1); playerIndex++) {
                // Uses unshift to preserve order
                tempArr.unshift(base + playerIndexOrder[playerIndex]);
            }
            playerIndexOrder = playerIndexOrder.concat(tempArr);
        }

        // Puts the player in the right place
        for (let player = 0; player < playerIndexOrder.length; player++) {
            seedOrder[playerIndexOrder[player]] = player + 1;
        }
        return seedOrder;
    }

    set_matches = matches => {
        API.send_users_to_matches({ matches: matches }).then(result => {
            if (result.data) {
                this.setState({ redirectTo: `/display/${this.state.tournament.name}/${this.state.tournament.owner}/${this.state.tournament.id}` })
            }
        });
    }

    render () {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <>
                    <Navbar
                        update_user={this.props.update_user}
                        username={this.props.username}
                        loggedIn={this.props.loggedIn} />
                    <Container>
                        <div className="row" style={styles.cardCol} >
                            <div className="col s12 m9" >
                                <div className="card blue-grey darken-1" style={styles.card} >
                                    <div className="card-content white-text">
                                        <span className="card-title center-align truncate">Tournament Info</span>
                                        <p>Name: {this.state.tournament.name}</p>
                                        <p>type: {this.state.tournament.gameType}</p>
                                        <p>Time: {this.state.tournament.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 m3" >
                                <ul className="collection with-header" style={styles.collect}>
                                    <li className="center-align collection-header">
                                        Player List {this.state.players.length}/{this.state.tournament.sizeLimit}
                                    </li>
                                    {this.state.players.map((user, i) => {
                                        return <li key={i}
                                            className="collection-item center-align">{user.username}
                                        </li>
                                    })
                                    }

                                </ul>
                            </div>
                        </div>
                        {!this.props.loggedIn || this.state.players.length === this.state.tournament.sizeLimit
                            ?
                            <>
                            </>
                            :
                            <div className="center-align col s12 truncate">
                                <Button
                                    btn={this.state.btn}
                                    style={styles.subBtn}
                                    onClick={this.handle_click}
                                />
                            </div>
                        }

                        {this.props.username === this.state.tournament.owner && this.state.players.length >= 2 &&
                            <div className="center-align col s12 truncate">
                                <Button
                                    owner={this.state.tournament.sizeLimit === this.state.players.length ? this.state.full : this.state.early}
                                    style={styles.subBtn}
                                    onClick={this.get_users}
                                />
                            </div>}
                    </Container>
                </>
            )
        }
    }
}

export default TourneyJoin
