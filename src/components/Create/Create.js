import React from "react";
// import Container from "../Container";
import { Link } from "react-router-dom";
import tournament from "../../pages/TournamentCreate"


// Dis page is to for the creation of a tournement, it will allow for a redirection
// to another page that takes in the users specifications, that will then generate the
// brackets --- as of now it's just a mock button for the mock design  
const btnStyles = {
    "marginTop": "5vh",
    width: "250px"
}

const CreateButton = () => (

    // <li className="btn waves-effect white right" style={btnStyles}>
    //     {/* <Link to="/tournament">Create</Link> */}
    // </li>
    <Link to="/tournament"> 
        <button
            className="btn waves-effect white right black-text"
            style={btnStyles}
        > Create </button> 
    </Link>

)

export default CreateButton;