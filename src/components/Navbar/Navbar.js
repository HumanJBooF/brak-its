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
    }).catch(err => console.log(`LOGOUT ERROR: ${err}`));
}

const Navbar = props => (
    <nav className="" style={styles.nav}>
        <div className="nav-wrapper" style={styles.wrap}>
            <div className="brand-logo fixed" style={styles.logoFont}><Link to="/">[ Brakits ]</Link></div>
            {!props.loggedIn
                ? (
                    <ul className="right" >
                        <li><Link to="/signup" style={styles.userSigns}>Sign Up</Link></li>
                        <li><Link to="/signin" style={styles.userSigns}>Sign In</Link></li>
                    </ul>
                )
                : (
                    // just concept again showing that we can grab the current logged in user and display their name
                    <ul className="right">
                        <li><Link to='#!' style={styles.userFont} username={props.username}>{props.username}</Link></li>
                        <li><Link to='#!' style={styles.userLog} onClick={() => logout(props)}>Logout</Link></li>
                    </ul>
                )}
        </div>
    </nav>
)

export default Navbar;