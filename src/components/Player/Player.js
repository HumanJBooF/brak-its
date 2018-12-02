import React from 'react';
import './Player.css';

const Player = props => (
    <>
        {(props.admin && props.player.isActive)
            ? <button className="player playerButton" playerinfo={props.player} onClick={event => {props.handle_win(event)}}>{
                props.player.player === null
                    ? ""
                    : props.player.player
            }</button>
            : <div className="player">{
                (props.player.player === undefined && props.player.roundNum === 1)
                    ? "Bye"
                    : props.player.player === null
                        ? ""
                        : props.player.player
            }</div>
        }
    </>
)

export default Player;