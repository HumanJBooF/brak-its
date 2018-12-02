import React from 'react';
import styles from './btnStyles';
import './btnStyles.css'

const Button = props => (

    <div className="col s12">
        <button
            id="bhuton"
            className="btn btn-large light-blue black-text col s12"
            onClick={props.onClick}
        >
            {props.btn}{props.owner}
        </button>
    </div>
)

export default Button;