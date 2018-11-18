import React from 'react';
import Container from '../Container';
import { Link } from 'react-router-dom'



const RecentCard = props => (

    <Container>
        <div className="row">
            <div className="card horizontal large grey lighten-4">
                <div className="card-content">
                    <h1 className="center-align"> <strong> Recent Tournaments</strong></h1>
                    <ul className="center-align">
                         {props.recentarr.map((name, i) => (
                            <li key={i}><Link to={`/tournament/${name.id}`}>{name.name}</Link></li>
                        ))}
                        {/* <li recentarr={props.recentarr}>{props.recentarr[0]}</li> */}
                    </ul>
                </div>
            </div>
        </div>
    </Container>

)


export default RecentCard;