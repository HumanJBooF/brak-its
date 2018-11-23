import React from 'react';
import { Link } from 'react-router-dom';
// import Container from '../Container';

const RecentCard = props => (
        <div className="row">
            <div className="card large grey lighten-4">
                <div className="card-content">
                    <h1 className="col s12 center">
                        <strong> Recent Tournaments</strong>
                    </h1>
                    <div className="row col s12">
                        <table className="centered responsive-table highlight striped">
                            <thead>
                                <tr>
                                    <th>Tournament Name</th>
                                    <th>Game-Type</th>
                                    <th>Organizer</th>
                                    <th>Size</th>
                                    <th>Format</th>
                                    <th>Date</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.recentarr.map((name, i) => (
                                    <tr key={i}>
                                        <td><Link to={`/tournament/${name.owner}/${name.name}`}><h6>{name.name}</h6></Link></td>
                                        <td><h6>{name.gameType}</h6></td>
                                        <td><h6>{name.owner}</h6></td>
                                        <td><h6>{name.sizeLimit}</h6></td>
                                        <td><h6>{name.format}</h6></td>
                                        <td><h6>{name.date}</h6></td>
                                        <td><h6>
                                            {`${name.isActive.toString().charAt(0).toUpperCase()}${name.isActive.toString().slice(1)}`}
                                        </h6></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
)

export default RecentCard;