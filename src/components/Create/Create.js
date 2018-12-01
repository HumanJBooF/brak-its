import React from 'react';
// import Container from "../Container";
import { Link } from 'react-router-dom';
import tournament from '../../pages/TournamentCreate';
import styles from './CreateStyle';


// Dis page is to for the creation of a tournement, it will allow for a redirection
// to another page that takes in the users specifications, that will then generate the
// brackets --- as of now it's just a mock button for the mock design  


const CreateButton = () => (

    <Link to="/tournament">
        <button
            className=" right btn-large waves-effect light-blue white-text"
            style={styles.btn}
        >
           <strong>Create Tournament</strong>
        </button>
    </Link>

)

export default CreateButton;