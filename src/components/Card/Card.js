import React from 'react';
import styles from './CardStyles';

const Card = ({ children }, props) => (

    <div className="row valign-wrapper">
        <div className="col s6 offset-s3 valign">
            <div className="card z-depth-5" style={styles}>
                <div className="card-content">
                    <span className="card-title green lighten-3 center-align black-text"></span>
                    {children}
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    </div>

)

export default Card;