import React from 'react';
import './RecentCard.css'
import { Link } from 'react-router-dom';

const RecentCard = props => (
    <div className="row">
        <div className="card large" id="scroll">
            <div className="card-content">
                <h1 className="col s12 center">
                    <strong>{props.title}</strong>
                </h1>
                <div className="row col s12">
                    <table className="centered highlight striped">
                        <thead>
                            <tr>
                                <th>Tournament Name</th>
                                <th>Game-Type</th>
                                <th className="hide-on-med-and-down">Organizer</th>
                                <th>Size</th>
                                <th className="hide-on-med-and-down">Format</th>
                                <th className="hide-on-med-and-down">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.recentarr.map((name, i) => (
                                <tr key={i}>
                                    {!name.isActive &&
                                        <td><Link to={`/join/${name.owner}/${name.id}`}><h6>{name.name}</h6></Link></td>
                                    }
                                    {name.isActive &&
                                        <td><Link to={`/display/${name.name}/${name.owner}/${name.id}`}><h6>{name.name}</h6></Link></td>
                                    }
                                    <td><h6>{name.gameType}</h6></td>
                                    <td className="hide-on-med-and-down"><h6>{name.owner}</h6></td>
                                    <td><h6>{name.actualSize}/{name.sizeLimit}</h6></td>
                                    <td className="hide-on-med-and-down"><h6>{name.format}</h6></td>
                                    <td className="hide-on-med-and-down" ><h6>
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