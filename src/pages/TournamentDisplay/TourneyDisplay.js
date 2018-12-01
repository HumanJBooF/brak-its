import React from 'react';
import Container from '../../components/Container';
import Tournament from '../../components/Tournament';
import Navbar from '../../components/Navbar'
import API from '../../utils/API';

class TourneyDisplay extends React.Component {
    state = {
        tourneyInfo: {},
        allMatches: [],
        matches: [],
        size: null,
        matchNumbersInfo: [],
        admin: false
    }

    componentDidMount = () => {
        this.get_users();
        this.get_tourney();
    }

    check_permission = _cb => {
        if (this.props.loggedIn) {
            if (this.state.tourneyInfo.owner === this.props.username) {
                this.setState({ admin: true }, () => {
                    _cb()
                })
            }
        }
    }

    get_tourney = () => {
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

            this.setState({ tourneyInfo: tourney }, () => {
                this.check_permission(() => {
                    this.tournament_set_up();
                });
            })
        })
    }

    get_users = () => {
        const { match: { params: { name, owner, id } } } = this.props;
        API.get_users_for_matches(id).then(results => {
            const { matches, users } = results.data;
            let user = users.map(user => {
                return {
                    username: user.username,
                    id: user.signUp.id
                }
            })
            user.filter(obj => {
                matches.filter(match => {
                    if (obj.id === match.player1Id) match.player1Id = obj.username;
                    if (obj.id === match.player2Id) match.player2Id = obj.username;
                })
            })
            const size = Math.pow(2, Math.ceil(Math.log2(users.length)))
            this.setState({
                matches: matches,
                size: size
            })

        })
    }

    tournament_set_up = () => {
        const info = {
            roundInfo: [],
            matchNumbersInfo: [],
            matchesUsed: []
        };

        const roundsToRun = Math.ceil(Math.log2(this.state.size));
        info.matchNumbersInfo = this.generate_matchNumbers(roundsToRun);

        let index = 0;

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundSize = this.state.size / Math.pow(2, currentRound + 1);

            this.sort_rounds(roundSize, index).map((arr, i) => {
                switch (i) {
                    case 0:
                        info.roundInfo.push(arr)
                        break;
                    default:
                        if (arr[0]) {
                            info.matchesUsed = [...info.matchesUsed, ...arr]
                        }
                        break;
                }

                return;
            })

            index += roundSize;

        }

        if (this.state.matches[index - 1]) {
            switch (this.state.matches[index - 1].winner) {
                case null:
                    info.roundInfo.push([{
                        player: null,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                case this.state.matches[index - 1].player1Id:
                    info.roundInfo.push([{
                        player: this.state.matches[index - 1].player1Id,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                case this.state.matches[index - 1].player2Id:
                    info.roundInfo.push([{
                        player: this.state.matches[index - 1].player2Id,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (index * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                default:
                    console.log('Should not be possible to see this, this means the response has a winner of something other than P1, P2, or null for the last round :(')
                    break;
            }
        } else {
            info.roundInfo.push([{
                player: null,
                score: null,
                matchNum: null,
                nextMatch: null,
                winner: null,
                boxOrder: (index * 2) + 1,
                isActvie: false
            }]);
        }

        this.setState({
            allMatches: info.roundInfo,
            matchNumbersInfo: info.matchNumbersInfo,
            matchesUsed: info.matchesUsed
        });
    }

    generate_matchNumbers = roundsToRun => {
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
        return (matchNumbersInfo)
    }

    sort_rounds = (roundSize, index) => {
        const roundInfo = [];
        const matchesUsed = [];

        for (let currentIndex = index; currentIndex < roundSize + index; currentIndex++) {

            let currentMatch = this.state.matches[currentIndex];
            let isActiveValue;

            if (currentMatch === undefined) {
                isActiveValue = false
            } else {
                if (currentMatch.player1Id === null || currentMatch.player2Id === null || currentMatch.player1Id === undefined || currentMatch.player2Id === undefined || currentMatch.winner !== null) {
                    isActiveValue = false
                } else {
                    isActiveValue = true;
                }
            }

            switch (currentMatch) {
                case undefined:
                    roundInfo.push({
                        player: null,
                        score: null,
                        matchNum: null,
                        nextMatch: null,
                        winner: null,
                        boxOrder: (currentIndex * 2) + 1,
                        isActive: isActiveValue
                    }, {
                            player: null,
                            score: null,
                            matchNum: null,
                            nextMatch: null,
                            winner: null,
                            boxOrder: (currentIndex * 2) + 2,
                            isActive: isActiveValue
                        })
                    break;
                default:
                    roundInfo.push({
                        player: currentMatch.player1Id,
                        matchNum: currentMatch.matchNum,
                        nextMatch: currentMatch.nextMatch,
                        winner: currentMatch.winner,
                        boxOrder: (currentMatch.matchNum * 2) - 1,
                        isActive: isActiveValue
                    }, {
                            player: currentMatch.player2Id,
                            matchNum: currentMatch.matchNum,
                            nextMatch: currentMatch.nextMatch,
                            winner: currentMatch.winner,
                            boxOrder: currentMatch.matchNum * 2,
                            isActive: isActiveValue
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

    handle_win = event => {
        event.preventDefault()
        const playerInfo = { ...event._targetInst.memoizedProps.playerinfo };
        console.log(playerInfo)
    }

    render () {
        return (
            <>
                <Navbar
                    update_user={this.props.update_user}
                    loggedIn={this.props.loggedIn}
                    username={this.props.username}
                />
                <Container>



                    <Tournament allMatches={this.state.allMatches} admin={this.state.admin} handle_win={event => { this.handle_win(event) }} />

                </Container>
            </>
        )
    }
}

export default TourneyDisplay;