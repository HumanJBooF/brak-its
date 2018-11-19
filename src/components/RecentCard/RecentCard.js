import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';




const RecentCard = props => (
    <Container>
        <div className="row">
            <div className="card horizontal large grey lighten-4">
                <div className="card-content">
                    <h1 className="center-align"> <strong>Recent Tournaments</strong></h1>
                    <ul className="center-align">
                         {props.recentarr.map((name, i) => (
                            <li key={i}>
                                <Link to={`/tournament/${name.id}`}>
                                    {name.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </Container>
)

export default RecentCard;