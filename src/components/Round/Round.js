import React from 'react';
import Player from '../Player'
import './Round.css';

const Round = props => (
    <div className="round">
        {props.roundInfo.map((player, i) => (
            <div key={i} className="playerContainer">
                <Player admin={props.admin} player={player} handle_win={event => props.handle_win(event)} />
            </div>
        ))}
    </div>
    //     {/* {
    //         props.admin
    //             ? props.roundInfo.map((player, i) => (
    //                 <div key={i} className="playerContainer">
    //                     <button className="player" onClick={props.handle_win}>{
    //                         player.player === false 
    //                             ? ""
    //                             : player.player === null
    //                                 ? "BYE"
    //                                 : player.player
    //                     }</button>
    //                 </div>
    //             ))
    //             : props.roundInfo.map((player, i) => (
    //                 <div key={i} className="playerContainer">
    //                     <div className="player">{
    //                         player.player === false
    //                             ? ""
    //                             : player.player === null
    //                                 ? "BYE"
    //                                 : player.player
    //                     }
    //                     </div>
    //                 </div>
    //             ))
    //     }
    // </div> */}
)

export default Round;