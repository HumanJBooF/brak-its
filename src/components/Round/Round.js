import React from 'react';
import './Round.css';
import styles from './RoundStyles';

const Tournament = props => (
    <div className="round">
        {props.roundInfo.map(match => (
            <>
                <div style={styles.playerContainer}>
                    <div style={styles.player}>{match.player_1}</div>
                </div>
                <div style={styles.playerContainer}>
                    <div style={styles.player}>{match.player_2}</div>
                </div>
            </>
        ))}
    </div>
)

export default Tournament;