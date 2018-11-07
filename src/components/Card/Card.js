import React from "react";

const cardStyle = {
    "margin-top": "15%"
}


const Card = ({ children }, props) => (

    <div className="card " style={cardStyle}>
        <div className="card-content">
            <span className="card-title green lighten-3 center-align"></span>
            {children}
        </div>
        <div className="card-footer"></div>
    </div>

)

export default Card;