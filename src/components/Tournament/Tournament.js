import React from "react";
import Round from "../Round";
import "./Tournament.css";

const Tournament = props => (
    <div className="col s10 offset-s1 tournamentViewport">
        <div className="tournamentDisplay">
            {props.tourneyInfo.map(round => (
                <Round key={round.length} roundInfo={round} />
            ))}
        </div>
    </div>

)

export default Tournament;