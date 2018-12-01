import React from 'react';
// import styles from './btnStyles';
import './btnStyles.css'
const Button = props => (

    <div className="col s12">
        <button
            className="btn-large light-blue white-text col s12"
            id="bhuton"
            // style={styles.btn}
            onClick={props.onClick}
        >
            <strong>{props.btn}</strong>
        </button>
    </div>
)

export default Button;