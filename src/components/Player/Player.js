import React from 'react';
import './Player.css';

const Player = props => (
    <>
        {(props.admin && props.player.isActive)
            ? <button className="player playerButton" playerinfo={props.player} onClick={event => {props.handle_win(event)}}>{
                props.player.player === null
                    ? "BYE"
                    : props.player.player
            }</button>
            : <div className="player">{
                props.player.player === null
                    ? "BYE"
                    : props.player.player
            }</div>
        }
    </>
)

    // < div key = { i } className = "playerContainer" >
    //     <button className="player" onClick={props.handle_win}>{
    //         player.player === false
    //             ? ""
    //             : player.player === null
    //                 ? "BYE"
    //                 : player.player
    //     }</button>
    // </div >

export default Player;