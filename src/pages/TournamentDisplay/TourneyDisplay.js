import React from 'react';
import Container from '../../components/Container';
import Tournament from '../../components/Tournament';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './styles';
import API from '../../utils/API';
import swal from 'sweetalert2';


class TourneyDisplay extends React.Component {
    state = {
        tourneyInfo: {},
        allMatches: [],
        matchesUsed: [],
        matches: [],
        size: null,
        matchNumbersInfo: [],
        activeRounds: [],
        admin: false
    }

    componentDidMount = () => {
        this.get_users();
    }



    check_permission = () => {
        if (this.props.loggedIn) {
            if (this.state.tourneyInfo.owner === this.props.username) {
                this.setState({ admin: true });
            }
        }
    }

    get_users = () => {
        const { match: { params: { name, owner, id } } } = this.props;
        API.get_users_for_matches(id).then(results => {
            const { matches, users } = results.data;

            let user = users.map(user => {
                return {
                    username: user.username,
                    id: user.signUp.id
                };
            });

            user.filter(obj => {
                matches.filter(match => {
                    if (obj.id === match.player1Id) match["player1Name"] = obj.username;
                    if (obj.id === match.player2Id) match['player2Name'] = obj.username;
                });
            });

            const size = Math.pow(2, Math.ceil(Math.log2(users.length)));

            return this.get_tourney(matches, size);
        })
    }

    get_tourney = (matches, size) => {
        const { match: { params: { name, owner, id } } } = this.props;
        API.show_one(owner, id).then(results => {
            const tournament = results.data.tournament;

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
            };

            return this.tournament_set_up(tourney, matches, size);
        })
    }

    tournament_set_up = (tourney, matches, size) => {
        const info = {
            roundInfo: [],
            matchNumbersInfo: [],
            matchesUsed: [],
            activeRounds: []
        };

        const roundsToRun = Math.ceil(Math.log2(size));
        info.matchNumbersInfo = this.generate_matchNumbers(roundsToRun);

        let index = 0;

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundSize = size / Math.pow(2, currentRound + 1);

            console.log("index: ", index, "current round: ", currentRound, "round size", roundSize);

            this.sort_rounds(roundSize, index, matches, currentRound).map((arr, i) => {
                switch (i) {
                    case 0:
                        info.roundInfo.push(arr);
                        break;
                    default:
                        if (arr[0]) {
                            info.matchesUsed = [...info.matchesUsed, ...arr];
                        };
                        break;
                };

                return;
            });

            index += roundSize;
        };

        if (matches[index - 1]) {
            switch (matches[index - 1].winner) {
                case null:
                    info.roundInfo.push([{
                        player: null,
                        playerId: null,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false,
                        roundNum: roundsToRun + 1
                    }]);
                    break;
                case matches[index - 1].player1Id:
                    info.roundInfo.push([{
                        player: matches[index - 1].player1Name,
                        playerId: matches[index - 1].player1Id,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false,
                        roundNum: roundsToRun + 1
                    }]);
                    break;
                case matches[index - 1].player2Id:
                    info.roundInfo.push([{
                        player: matches[index - 1].player2Name,
                        playerId: matches[index - 1].player2Id,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false,
                        roundNum: roundsToRun + 1
                    }]);
                    break;
                default:
                    console.log('Should not be possible to see this, this means the response has a winner of something other than P1, P2, or null for the last round :(')
                    break;
            }
        } else {
            info.roundInfo.push([{
                player: null,
                playerId: null,
                score: null,
                matchNum: null,
                nextMatch: null,
                winner: null,
                boxOrder: (index * 2) + 1,
                isActvie: false,
                roundNum: roundsToRun + 1
            }]);
        };

        info.roundInfo.map((round, roundNum) => {

            let roundState = true
            round.map(subPlayer => {
                switch (roundNum) {
                    case 0:
                        break;
                    default:
                        if (subPlayer.player === null || subPlayer.player === undefined) {
                            roundState = false
                        }
                }
            })
            info.activeRounds.push(roundState)
        })
        console.log(info.activeRounds)

        this.setState({
            tourneyInfo: tourney,
            allMatches: info.roundInfo,
            matchNumbersInfo: info.matchNumbersInfo,
            matchesUsed: info.matchesUsed,
            matches: matches,
            activeRounds: info.activeRounds,
            size: size
        }, () => this.check_permission());
    };

    generate_matchNumbers = (roundsToRun) => {
        let indexTracker = 0;
        const matchNumbersInfo = [];

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundInfo = [];

            const roundSize = Math.pow(2, roundsToRun) / (Math.pow(2, currentRound) * 2);

            for (let currentMatch = 1; currentMatch < roundSize + 1; currentMatch++) {
                roundInfo.push(currentMatch + indexTracker);
            }

            matchNumbersInfo.push(roundInfo);

            indexTracker += roundSize;
        }
        return (matchNumbersInfo);
    }

    sort_rounds = (roundSize, index, matches, currentRound) => {
        const roundInfo = [];
        const matchesUsed = [];

        for (let currentIndex = index; currentIndex < roundSize + index; currentIndex++) {

            let currentMatch = matches[currentIndex];
            let isActiveValue;

            if (currentMatch === undefined) {
                isActiveValue = false;
            } else {
                if (currentMatch.player1Id === null || currentMatch.player2Id === null || currentMatch.player1Id === undefined || currentMatch.player2Id === undefined || currentMatch.winner !== null) {
                    isActiveValue = false;
                } else {
                    isActiveValue = true;
                }
            }

            switch (currentMatch) {
                case undefined:
                    roundInfo.push({
                        player: undefined,
                        playerId: null,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (currentIndex * 2) + 1,
                        isActive: isActiveValue,
                        roundNum: currentRound + 1
                    }, {
                            player: undefined,
                            playerId: null,
                            score: null,
                            matchNum: null,
                            nextMatch: null,
                            winner: null,
                            boxOrder: (currentIndex * 2) + 2,
                            isActive: isActiveValue,
                            roundNum: currentRound + 1
                        })
                    break;
                default:
                    roundInfo.push({
                        player: currentMatch.player1Name,
                        playerId: currentMatch.player1Id,
                        matchNum: currentMatch.matchNum,
                        nextMatch: currentMatch.nextMatch,
                        winner: currentMatch.winner,
                        boxOrder: (currentMatch.matchNum * 2) - 1,
                        isActive: isActiveValue,
                        roundNum: currentRound + 1
                    }, {
                            player: currentMatch.player2Name,
                            playerId: currentMatch.player2Id,
                            matchNum: currentMatch.matchNum,
                            nextMatch: currentMatch.nextMatch,
                            winner: currentMatch.winner,
                            boxOrder: currentMatch.matchNum * 2,
                            isActive: isActiveValue,
                            roundNum: currentRound + 1
                        });

                    matchesUsed.push(currentMatch.matchNum);

                    break;
            }
        }
        roundInfo.sort((a, b) => {
            return a.boxOrder - b.boxOrder;
        });

        return [roundInfo, matchesUsed];

    }

    check_winner = player => {
        if (!player.nextMatch) {
            const id = this.state.tourneyInfo.id;
            API.end_match({ id: id }).then(result => {
                console.log(result.data)
            });
            swal({
                title: `${player.player} is the winner!`,
                text: `Go take a vacation, you have earned it!`,
                width: 600,
                padding: '3em',
                background: '#fff',
                backdrop: `rgba(0,0,123,0.4)
                url("/assets/img/water.gif")
                center
                no-repeat`
            })
        } else {
            console.log('NOPE');
        }
    }

    handle_win = event => {
        event.preventDefault()

        const playerInfo = { ...event._targetInst.memoizedProps.playerinfo };

        const playerNum = playerInfo.matchNum % 2 ? 'player1Id' : 'player2Id'

        swal({
            title: `${playerInfo.player}`,
            text: "Would you like to send this player to the next round?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send them!',
            background: '#232C33'
        }).then((result) => {
            if (result.value) {

                swal(`${playerInfo.player}`,
                    'Has been sent to the next round',
                    'success')

                if (this.state.matchesUsed.includes(playerInfo.nextMatch)) {
                    console.log('should be update')

                    const player = {};
                    player[playerNum] = playerInfo.playerId;

                    const info = {
                        next: {
                            player: player,
                            matchNum: playerInfo.nextMatch,
                            tourneyUuid: this.state.tourneyInfo.id
                        },
                        winner: {
                            winner: playerInfo.playerId,
                            matchNum: playerInfo.matchNum,
                            nextMatch: playerInfo.nextMatch,
                        }
                    }

                    this.check_winner(playerInfo);
                    API.update_match({ info }).then(() => {
                        this.get_users();
                    })
                } else {
                    let currentMatchIndex;
                    const playerNum = playerInfo.matchNum % 2 ? 'player1Id' : 'player2Id';
                    const createInfo = { tourneyUuid: this.state.tourneyInfo.id };
                    this.state.matchNumbersInfo.map((round, i) => {
                        if (round.includes(playerInfo.matchNum)) {
                            currentMatchIndex = this.state.matchNumbersInfo[i].indexOf(playerInfo.matchNum);
                            if (this.state.matchNumbersInfo[i + 1]) {
                                createInfo['matchNum'] = this.state.matchNumbersInfo[i + 1][Math.floor(currentMatchIndex / 2)];
                                if (this.state.matchNumbersInfo[i + 2]) {
                                    createInfo['nextMatch'] = this.state.matchNumbersInfo[i + 2][Math.floor(currentMatchIndex / 4)];
                                    console.log(this.state.matchNumbersInfo, 'STATE MATCH NUMBERS')
                                    console.log(currentMatchIndex, i, 'CURRENT <MATCH INDEX ')
                                } else {
                                    createInfo.nextMatch = null;
                                }
                            }
                        }
                    })
                    const updateWinner = {
                        winner: playerInfo.playerId,
                        matchNum: playerInfo.matchNum,
                        nextMatch: playerInfo.nextMatch,
                        tourneyUuid: this.state.tourneyInfo.id
                    }
                    console.log(createInfo, 'CREATE INFO')
                    console.log(updateWinner, 'UPDATE WINNER')

                    createInfo[playerNum] = playerInfo.playerId;

                    this.check_winner(playerInfo);
                    API.create_next_match({ match: createInfo, winner: updateWinner }).then(() => {
                        this.get_users();
                    });
                }
            }
        })
    }

    render () {
        return (
            <>

                <Navbar
                    update_user={this.props.update_user}
                    loggedIn={this.props.loggedIn}
                    username={this.props.username}
                />
                <Container fluid>
                    <div className="row">
                        <div className="col s12 center white-text">
                            <h2><span style={styles.span}>{this.state.tourneyInfo.name}</span></h2>
                        </div>
                    </div>
                    <Tournament
                        allMatches={this.state.allMatches}
                        admin={this.state.admin}
                        activeRounds={this.state.activeRounds}
                        handle_win={event => this.handle_win(event)} />
                    <div className="row">
                        <div className="col s12 center">
                            {this.state.tourneyInfo.owner === this.props.username &&
                                <h5 className="white-text" style={styles.ownerText}> Click the winning player to send them to the next round</h5>
                            }
                        </div>
                    </div>
                    <Footer />
                </Container>
            </>
        );
    };
};


export default TourneyDisplay;