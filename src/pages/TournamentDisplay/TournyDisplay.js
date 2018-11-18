import React from "react";
import Container from "../../components/Container"
import Tournament from "../../components/Tournament"


class TournDisplay extends React.Component {
    state = {
        tourneyInfo: []
    }

    //================================================================================================

    tempMatchData = [

        // Round 1

        {
            player_1: "1",
            player_2: "2",
            p1_score: 10,
            p2_score: 20,
            winner: "2",
            match_num: 1,
            next_match: 5
        }, {
            player_1: "3",
            player_2: "4",
            p1_score: 15,
            p2_score: 12,
            winner: "3",
            match_num: 2,
            next_match: 5
        }, {
            player_1: "5",
            player_2: "6",
            p1_score: 8,
            p2_score: 12,
            winner: "6",
            match_num: 3,
            next_match: 6
        }, {
            player_1: "7",
            player_2: "8",
            p1_score: 18,
            p2_score: 20,
            winner: "8",
            match_num: 4,
            next_match: 6
        },

        // Round 2

        {
            player_1: "2",
            player_2: "3",
            p1_score: 14,
            p2_score: 17,
            winner: "3",
            match_num: 5,
            next_match: 7
        }, {
            player_1: "6",
            player_2: "8",
            p1_score: 12,
            p2_score: 10,
            winner: "6",
            match_num: 6,
            next_match: 7
        },

        // Round 3

        {
            player_1: "3",
            player_2: "6",
            p1_score: 60,
            p2_score: 3,
            winner: "3",
            match_num: 7,
            next_match: 8
        }];

    //================================================================================================

    tempMatchData = [

        // Round 1

        {
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
            p1_score: 15,
            p2_score: 12,
            winner: "3",
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
        }, {
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
        },

        // Round 2

        {
            player_1: "2",
            player_2: "3",
            p1_score: 15,
            p2_score: 11,
            winner: "2",
            match_num: 9,
            next_match: 13
        }, {
            player_1: "6",
            player_2: "8",
            p1_score: 12,
            p2_score: 18,
            winner: "8",
            match_num: 10,
            next_match: 13
        }, {
            player_1: "10",
            player_2: "11",
            p1_score: 12,
            p2_score: 16,
            winner: "11",
            match_num: 11,
            next_match: 14
        }, {
            player_1: "13",
            player_2: "16",
            p1_score: 20,
            p2_score: 10,
            winner: "13",
            match_num: 12,
            next_match: 14
        },

        // Round 3

        {
            player_1: "2",
            player_2: "8",
            p1_score: 18,
            p2_score: 17,
            winner: "2",
            match_num: 13,
            next_match: 15
        }, {
            player_1: "11",
            player_2: "13",
            p1_score: 12,
            p2_score: 17,
            winner: "13",
            match_num: 14,
            next_match: 15
        },

        // Round 4

        {
            player_1: "2",
            player_2: "13",
            p1_score: 40,
            p2_score: 4,
            winner: "2",
            match_num: 15,
            next_match: 16
        }];

    //================================================================================================

    // tempTourneyData = {
    //     size: 8
    // };

    tempTourneyData = {
        size: 16
    }


    componentDidMount = () => {
        const size = this.tempTourneyData.size;
        const tourneyInfo = [];
        const roundsToRun = Math.ceil(Math.sqrt(size));

        let indexTraker = 0;

        for (let currentRound = 0; currentRound < roundsToRun; currentRound++) {
            const roundSize = size / (2 * Math.pow(2, currentRound));

            tourneyInfo.push(
                this.sort_rounds(roundSize, indexTraker)
            );

            indexTraker += roundSize;
        }

        this.setState({ tourneyInfo: tourneyInfo })

        console.log(tourneyInfo)
    }

    sort_rounds = (roundSize, indexTraker) => {
        const roundInfo = [];

        this.tempMatchData.map(match => {
            if (match.match_num <= (roundSize + indexTraker)
                && match.match_num > indexTraker) {
                roundInfo.push(match);
            }
        });

        return roundInfo;
    }

    render () {
        return (
            <>
                <Container>
                    <Tournament tourneyInfo={this.state.tourneyInfo} key="" />
                </Container>
            </>
        )
    }
}

export default TournDisplay;