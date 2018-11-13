import React from 'react';
import Container from '../Container';

const RecentCard = () => (
    <Container>
        <div className="row">
            <h3 className="RecentHead center-align">Recent Matches</h3>
            <div className="card horizontal large grey lighten-4">
                <div className="card-content">
                    <h1 className="center-align"> <strong> Recent Tournaments</strong></h1>
                    <ul className="center-align">
                        <li>League of legends tournament</li>
                        <li>Runescape PVP challonge </li>
                        <li>CS:GO NvS vs qp</li>
                    </ul>
                </div>
            </div>
        </div>
    </Container>
)

export default RecentCard;