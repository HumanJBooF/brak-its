import React from "react";
import "./Round.css"

const Tournament = props => (
    <div className="round">
        {props.roundInfo.map(match => (
            <>
                <div className="playerContainer">
                    <div className="player">{match.player_1}</div>
                </div>
                <div className="playerContainer">
                    <div className="player">{match.player_2}</div>
                </div>
            </>
        ))}
    </div>
)

export default Tournament;