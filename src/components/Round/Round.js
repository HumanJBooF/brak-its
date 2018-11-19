import React from 'react';
import './Round.css';
import styles from './RoundStyles';

const Tournament = props => (
    <div className="round">
        {props.roundInfo.map( match => (
            <>
                <div styles={styles.playerContainer}>
                    <div styles={styles.player}> {match.player_1} </div>
                </div>
                <div styles={styles.playerContainer}>
                    <div styles={styles.player}> {match.player_2} </div>
                </div>
            </>
        ))}
    </div>
)

export default Tournament;