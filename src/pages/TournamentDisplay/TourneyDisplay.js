import React from 'react';
import Container from '../../components/Container';
import Tournament from '../../components/Tournament';
import Navbar from '../../components/Navbar'

class TourneyDisplay extends React.Component {
    state = {
        tourneyInfo: [],
        matchesUsed: [],
        admin: false
    }

    //================================================================================================

    // tempMatchData = [
    //     // Round 1
    //     {
    //         player_1: "1",
    //         player_2: "bye",
    //         p1_score: 10,
    //         p2_score: null,
    //         winner: "1",
    //         match_num: 1,
    //         next_match: 5
    //     }, {
    //         player_1: "4",
    //         player_2: "5",
    //         p1_score: 15,
    //         p2_score: 12,
    //         winner: "4",
    //         match_num: 2,
    //         next_match: 5
    //     }, {
    //         player_1: "2",
    //         player_2: "bye",
    //         p1_score: 8,
    //         p2_score: null,
    //         winner: "2",
    //         match_num: 3,
    //         next_match: 6
    //     }, {
    //         player_1: "3",
    //         player_2: "6",
    //         p1_score: 18,
    //         p2_score: 20,
    //         winner: "6",
    //         match_num: 4,
    //         next_match: 6
    //     },
    //     // Round 2
    //     {
    //         player_1: "1",
    //         player_2: "4",
    //         p1_score: 14,
    //         p2_score: 17,
    //         winner: "4",
    //         match_num: 5,
    //         next_match: 7
    //     }, {
    //         player_1: "2",
    //         player_2: "6",
    //         p1_score: 12,
    //         p2_score: 10,
    //         winner: "2",
    //         match_num: 6,
    //         next_match: 7
    //     },
    //     // Round 3
    //     {
    //         player_1: "4",
    //         player_2: "2",
    //         p1_score: 60,
    //         p2_score: 3,
    //         winner: "4",
    //         match_num: 7,
    //         next_match: 8
    //     }
    // ];

    //================================================================================================

    tempMatchData = [
        // Round 1
        {
            player_1: "7",
            player_2: "8",
            p1_score: 18,
            p2_score: 20,
            winner: "8",
            match_num: 4,
            next_match: 10
        }, {
            player_1: "9",
            player_2: "10",
            p1_score: 5,
            p2_score: 13,
            winner: "10",
            match_num: 5,
            next_match: 11
        }, {
            player_1: "11",
            player_2: "12",
            p1_score: 17,
            p2_score: 13,
            winner: "11",
            match_num: 6,
            next_match: 11
        }, {
            player_1: "13",
            player_2: "14",
            p1_score: 16,
            p2_score: 12,
            winner: "13",
            match_num: 7,
            next_match: 12
        }, {
            player_1: "15",
            player_2: "16",
            p1_score: 18,
            p2_score: 20,
            winner: "16",
            match_num: 8,
            next_match: 12
        },{
            player_1: "1",
            player_2: "2",
            p1_score: 10,
            p2_score: 20,
            winner: "2",
            match_num: 1,
            next_match: 9
        }, {
            player_1: "3",
            player_2: "4",
            p1_score: null,
            p2_score: null,
            winner: null,
            match_num: 2,
            next_match: 9
        }, {
            player_1: "5",
            player_2: "6",
            p1_score: 8,
            p2_score: 12,
            winner: "6",
            match_num: 3,
            next_match: 10
        },
        // Round 2
        {
            player_1: "2",
            player_2: null,
            p1_score: null,
            p2_score: null,
            winner: null,
            match_num: 9,
            next_match: 13
        }, {
            player_1: "6",
            player_2: "8",
            p1_score: null,
            p2_score: null,
            winner: null,
            match_num: 10,
            next_match: 13
        }, {
            player_1: "10",
            player_2: "11",
            p1_score: null,
            p2_score: null,
            winner: null,
            match_num: 11,
            next_match: 14
        }, {
            player_1: "13",
            player_2: "16",
            p1_score: null,
            p2_score: null,
            winner: null,
            match_num: 12,
            next_match: 14
        },
    //     // Round 3
    //     {
    //         player_1: "2",
    //         player_2: "8",
    //         p1_score: 18,
    //         p2_score: 17,
    //         winner: "2",
    //         match_num: 13,
    //         next_match: 15
    //     }, {
    //         player_1: "11",
    //         player_2: "13",
    //         p1_score: 12,
    //         p2_score: 17,
    //         winner: "13",
    //         match_num: 14,
    //         next_match: 15
    //     },
    //     // Round 4
    //     {
    //         player_1: "2",
    //         player_2: "13",
    //         p1_score: 40,
    //         p2_score: 4,
    //         winner: "2",
    //         match_num: 15,
    //         next_match: 16
    //     }
    ];

    //================================================================================================

    // tempTourneyData = {
    //     size: 8
    // };

    tempTourneyData = {
        size: 16
    }


    // componentDidMount = () => {
    //     const size = this.tempTourneyData.size;
    //     const tourneyInfo = [];
    //     const roundsToRun = Math.ceil(Math.sqrt(size));

    //     let indexTraker = 0;

    //     for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
    //         const roundSize = size / (2 * Math.pow(2, currentRound));

    //         tourneyInfo.push(
    //             this.sort_rounds(roundSize, indexTraker)
    //         );

    //         indexTraker += roundSize;
    //     }

    //     this.setState({ tourneyInfo: tourneyInfo })

    //     console.log(tourneyInfo)
    // }

    // sort_rounds = (roundSize, indexTraker) => {
    //     const roundInfo = [];

    //     this.tempMatchData.map(match => {
    //         if (match.match_num <= (roundSize + indexTraker)
    //             && match.match_num > indexTraker) {
    //                 roundInfo.push(match);
    //         }
    //     });

    //     roundInfo.sort((a, b) => {
    //         return a.match_num - b.match_num;
    //     });

    //     return roundInfo;
    // }

    // ======================================================================================

    componentDidMount = () => {
        // Check the permission of who is logged in
        this.check_permission();
        // Get tournament data (for now just grab whats listed above), should be an api call to the db
        const dbResponse = this.tempMatchData
        // Should ALWAYS be the high natural power of 2 needed
        const size = this.tempTourneyData.size

        const tourneyInfo = [];
        const roundsToRun = Math.ceil(Math.log2(size));

        let indexTraker = 0;

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundSize = size / Math.pow(2, currentRound + 1);

            tourneyInfo.push(
                this.sort_rounds(dbResponse, roundSize, indexTraker)
            );

            console.log(this.state.matchesUsed)

            indexTraker += roundSize;
        }

        if (dbResponse[indexTraker - 1]) {
            switch (dbResponse[indexTraker - 1].winner) {
                case null:
                    tourneyInfo.push([{
                        player: null,
                        score: null,
                        match_num: null,
                        next_match: null,
                        winner: null,
                        boxOrder: (indexTraker * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                case dbResponse[indexTraker - 1].player_1:
                    tourneyInfo.push([{
                        player: dbResponse[indexTraker - 1].player_1,
                        score: null,
                        match_num: null,
                        next_match: null,
                        winner: null,
                        boxOrder: (indexTraker * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                case dbResponse[indexTraker - 1].player_2:
                    tourneyInfo.push([{
                        player: dbResponse[indexTraker - 1].player_2,
                        score: null,
                        match_num: null,
                        next_match: null,
                        winner: null,
                        boxOrder: (indexTraker * 2) + 1,
                        isActvie: false
                    }]);
                    break;
                default:
                    console.log('Should not be possible to see this, this means the response has a winner of something other than P1, P2, or null for the last round :(')
                    break;
            }
        } else {
            tourneyInfo.push([{
                player: null,
                score: null,
                match_num: null,
                next_match: null,
                winner: null,
                boxOrder: (indexTraker * 2) + 1,
                isActvie: false
            }]);
        }



        this.setState({ tourneyInfo: tourneyInfo })

        console.log(tourneyInfo)
    }

    sort_rounds = (dbResponse, roundSize, indexTraker) => {
        const roundInfo = [];
        const matchesUsed = [];

        for (let currentIndex = indexTraker; currentIndex < roundSize + indexTraker; currentIndex++) {
            let currentMatch = dbResponse[currentIndex];
            let isActiveValue;

            if(currentMatch === undefined) {
                isActiveValue = false
            } else {
                if(currentMatch.player_1 === null || currentMatch.player_2 === null || currentMatch.player_1 === undefined || currentMatch.player_2 === undefined || currentMatch.winner !== null) {
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
                        match_num: null,
                        next_match: null,
                        winner: null,
                        boxOrder: (currentIndex * 2) + 1,
                        isActive: isActiveValue
                    }, {
                        player: null,
                        score: null,
                        match_num: null,
                        next_match: null,
                        winner: null,
                        boxOrder: (currentIndex * 2) + 2,
                        isActive: isActiveValue
                    })
                    break;
                default:
                    roundInfo.push({
                        player: currentMatch.player_1,
                        score: currentMatch.p1_score,
                        match_num: currentMatch.match_num,
                        next_match: currentMatch.next_match,
                        winner: currentMatch.winner,
                        boxOrder: (currentMatch.match_num * 2) - 1,
                        isActive: isActiveValue
                    }, {
                        player: currentMatch.player_2,
                        score: currentMatch.p2_score,
                        match_num: currentMatch.match_num,
                        next_match: currentMatch.next_match,
                        winner: currentMatch.winner,
                        boxOrder: currentMatch.match_num * 2,
                        isActive: isActiveValue
                    });

                    matchesUsed.push(currentMatch.match_num);

                    break;
            }
        }

        roundInfo.sort((a, b) => {
            return a.boxOrder - b.boxOrder;
        });

        const newArr = [...this.state.matchesUsed, ...matchesUsed]

        console.log("here", newArr)


        this.setState({ matchesUsed: newArr })

        console.log('state', this.state.matchesUsed)

        return roundInfo;
    }

    check_permission = () => {
        if(this.props.loggedIn) {
            if(this.props.username === this.props.username) {
                this.setState({ admin: true })
            }
        }
    }

    handle_win = (event) => {
        event.preventDefault();
        // console.log("Hopefully the player: ", event._targetInst.memoizedProps.playerinfo)
        const playerInfo = {...event._targetInst.memoizedProps.playerinfo};
        // playerInfo = {
        //     boxOrder
        //     isActive
        //     match_num
        //     next_match
        //     player
        //     score
        //     winner
        // }

        // Ask if manager wants to make player win, sweetmodal if true continue, if not boot

        // update current to reflect scores/win

        console.log(this.state.matchesUsed, playerInfo.next_match)

        if(this.state.matchesUsed.includes(playerInfo.next_match)) {
            console.log("should be update")
            // Should only need the opposite player name, everything else is the same as create

            if(playerInfo.match_num % 2) {
                console.log("e");
                // Is player 1
                const updateAt = playerInfo.next_match

                const updatedRound = {
                    player1: playerInfo.player
                }
            } else {
                console.log("o")
                // Is player 2
            }
        } else {
            console.log("Should be create")
            //

            if(playerInfo.match_num % 2) {
                console.log("e");
                // Is player 1
            } else {
                console.log("o")
                // Is player 2
            }
        }

        

        // re-get info from db, re-render page
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
                    <h6>{`${this.state.admin}`}</h6>

                    {true /* if tournament is active */
                        ? <Tournament tourneyInfo={this.state.tourneyInfo} admin={this.state.admin} handle_win={event => {this.handle_win(event)}}/>
                        : null
                    }

                    <div className="row">
                        <p>This is where info will go</p>

                        {true /* if owner = logged in */
                            ? <p>manager options show here</p>
                            : null
                        }
                    </div>
                </Container>
            </>
        )
    }
}

export default TourneyDisplay;