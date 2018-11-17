import React from 'react';
import styles from './btnStyles';

const Button = props => (
<<<<<<< HEAD
    <div className="row valign-wrapper">
        <div className="col s6 offset-s3">
            <button 
                className="btn btn-large truncate black-text"
                style={styles}
            > 
                {props.btn}
            </button>
        </div>
=======
    <div className="col s12">
        <button
            className="btn btn-large black-text col s12"
            style={styles.btn}
        >
            {props.btn}
        </button>
>>>>>>> 15dd802314403bdc44878d0f32e17b95dd06c2a3
    </div>
)

export default Button;