import React from 'react';
import './btnStyles.css'

const Button = props => (

    <div className="col s12">
        <button
            id="bhuton"
            className="btn btn-large light-blue black-text col s8 offset-s2"
            onClick={props.onClick}
        >
           <h5>{props.btn}{props.owner}</h5>
        </button>
    </div>
)

export default Button;