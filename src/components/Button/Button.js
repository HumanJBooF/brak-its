import React from "react";

const styles = {
    backgroundColor: "#88D9E6",
    width: "",
    lineHeight: "50px",
    fontSize: "30px",
    marginLeft: 0
}

const Button = props => (
    <div className="row valign-wrapper">
        <div className="col s6 offset-s3">
            <button 
                className="btn btn-large truncate black-text"
                style={styles}
            > 
                {props.btn}
            </button>
        </div>
    </div>
)

export default Button;