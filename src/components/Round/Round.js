import React from 'react';
import Player from '../Player'
import './Round.css';

const Round = props => (
    <div className="round">
        {props.roundInfo.map((player, i) => (
            <div key={i} className="playerContainer">
                <Player admin={props.admin} player={player} roundState={props.roundState} handle_win={event => props.handle_win(event)} />
            </div>
        ))}
    </div>
)

export default Round;