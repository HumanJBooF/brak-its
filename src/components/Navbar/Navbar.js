import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import styles from './NavStyles';

const logout = props => {
    API.logout().then(result => {
        if (result.status === 200) {
            props.update_user({
                loggedIn: false,
                username: null
            });
        }
    }).catch( err => console.log(`LOGOUT ERROR: ${err}`));
}

const Navbar = props => (
    <nav className="" style={styles.nav}>
        <div className="nav-wrapper">
            <div className="brand-logo"><Link to="/">[Brakits]</Link></div>
            {!props.loggedIn
                ? (
                    <ul className="right">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                )
                : (
                    // just concept again showing that we can grab the current logged in user and display their name
                    <ul className="right">
                        <li><Link to='#!' username={props.username}>{props.username}</Link></li>
                        <li><Link to='#!' onClick={() => logout(props)}>Logout</Link></li>
                    </ul>
                )}
        </div>
    </nav>
)

export default Navbar;