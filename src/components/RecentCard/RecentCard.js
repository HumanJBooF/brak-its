import React from 'react';
import Container from '../Container';

const RecentCard = () => (
    <Container>
        <div className="row">
            <h3 className="RecentHead center-align">Recent Matches</h3>
            <div className="card horizontal large grey lighten-4">
                <div className="card-content">
                    <h1>Shug Knight killed Tupac</h1>
                    <p className="center-align">BUSH DID 9/11</p>
                </div>
            </div>
        </div>
    </Container>
)

export default RecentCard;