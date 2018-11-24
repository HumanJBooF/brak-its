import React from 'react';
import styles from './btnStyles';

const Button = props => (

    <div className="col s12">
        <button
            className="btn btn-large black-text col s12"
            style={styles.btn}
            onClick={props.onClick}
        >
            {props.btn}
        </button>
    </div>
)

export default Button;