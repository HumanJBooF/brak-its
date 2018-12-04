import React from 'react';
import { Link } from 'react-router-dom';
import './create.css';

const CreateButton = () => (

    <div className="col s4 offset-s2">
        <div className="card horizontal z-depth-5" id="box">
            <div className="card-content col s12">
                <div className="divider"></div>
                <div className="col s12 center">
                    <Link to="/tournament">
                        <button
                            className="btn-large waves-effect light-blue white-text"
                        >
                            Create Tournament
                        </button>
                    </Link>
                    <div className="divider"></div>
                </div>
            </div>
        </div>
    </div>
)

export default CreateButton;