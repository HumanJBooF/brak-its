import React from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar'
import styles from './JoinStyles';
import API from '../../utils/API';

class TourneyJoin extends React.Component {

    state = {
        btn: 'Join Tournament!',
        early: 'Start Tournament Early?',
        full: 'Start Tournament',
        tournament: {},
        players: []
    }

    componentDidMount = () => {
        this.get_tourney();
    }


    get_users = () => {
        const tourneyId = this.state.tournament.id;

        API.get_users_tournament({ id: tourneyId }).then(result => {
            console.log(result.data.users)
            let users = result.data.users.map(user => user.username)
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
        // deconstructed this.props.match.params.owner // .id
        const { match: { params: { owner, id } } } = this.props

        API.show_one(owner, id).then(recent => {
            const tournament = recent.data.tournament
            const users = recent.data.users
            const userArr = [];

            if (!tournament) {
                // stuff here
            } else {
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
            }
        })
    }

    sort_players = players => {
        console.log(players)
        // Will be a list of the seed order
        let seeds = this.seeding_order(players.length);

        const firstRound = [];
        const highplayers = Math.pow(2, Math.ceil(Math.log2(players.length)));
        const byeWeeks = highplayers - players.length;
        seeds.map(index => {
            if (index <= seeds.length - byeWeeks) {
                firstRound.push(players[index - 1])
                console.log(players, index, ' IN THE IF')
            }
            else {
                firstRound.push(null)
            }
        })

        return this.get_db_ready(firstRound);
    }

    get_db_ready = arr => {
        const dbFirstRound = [];

        for (let i = 0; i < arr.length / 2; i++) {
            dbFirstRound[i] = {
                player1: arr[(i * 2)],
                player2: arr[(i * 2) + 1],
                matchNum: i,
            }
        }
        console.log(dbFirstRound)
        return dbFirstRound
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

            // Compunds the array
            playerIndexOrder = playerIndexOrder.concat(tempArr);
        }

        // Puts the player in the right place
        for (let player = 0; player < playerIndexOrder.length; player++) {
            seedOrder[playerIndexOrder[player]] = player + 1;
        }

        console.log(`SEED ORDER: ${seedOrder}`)
        return seedOrder;
        // -----------------------------------------------------------------------------------------------------------------

        // seedOrder[(players.length/2)] = atPlayer

        // //

        // seedOrder[(players.length/4) + (players.length/2)] = atPlayer + 1

        // seedOrder[(players.length/4)] = atPlayer + 2

        // //

        // seedOrder[(players.length/8) + (players.length/4)] = atPlayer + 3

        // seedOrder[(players.length/8) + (players.length/4) + (players.length/2)] = atPlayer + 4

        // seedOrder[(players.length/8) + (players.length/2)] = atPlayer + 5

        // seedOrder[(players.length/8)] = atPlayer + 6

        // //

        // seedOrder[(players.length/16) + (players.length/8)] = atPlayer + 7

        // seedOrder[(players.length/16) + (players.length/8) + (players.length/2)] = atPlayer + 8

        // seedOrder[(players.length/16) + (players.length/8) + (players.length/4) + (players.length/2)] = atPlayer + 9

        // seedOrder[(players.length/16) + (players.length/8) + (players.length/4)] = atPlayer + 10

        // seedOrder[(players.length/16) + (players.length/4)] = atPlayer + 11

        // seedOrder[(players.length/16) + (players.length/4) + (players.length/2)] = atPlayer + 12

        // seedOrder[(players.length/16) + (players.length/2)] = atPlayer + 13

        // seedOrder[(players.length/16)] = atPlayer + 14
    }

    render () {

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
                                    <p>date: {this.state.tournament.date}</p>
                                    <p>Time: {this.state.tournament.time}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col s12 m3" >
                            <ul className="collection with-header" style={styles.collect}>
                                <li className="center-align collection-header">Player List {this.state.players.length}/{this.state.tournament.sizeLimit}</li>
                                {this.state.players.map((user, i) => {
                                    return <li key={i} className="collection-item center-align">{user.username}</li>
                                })
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="center-align col s12 truncate">
                        <Button
                            btn={this.state.btn}
                            style={styles.subBtn}
                            onClick={this.handle_click}
                        />
                    </div>

                    {this.props.username === this.state.tournament.owner &&
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

export default TourneyJoin