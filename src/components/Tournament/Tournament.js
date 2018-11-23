import React from 'react';
import Round from '../Round';
import Navbar from '../../components/Navbar';
import './Tournament.css';

const Tournament = props => (
    <>
    <Navbar />
    <div className="col s10 offset-s1 tournamentViewport">
        <div className="tournamentDisplay">
            {props.tourneyInfo.map(round => (
                <Round key={round.length} roundInfo={round} />
            ))}
        </div>
    </div>
    </>
)

export default Tournament;