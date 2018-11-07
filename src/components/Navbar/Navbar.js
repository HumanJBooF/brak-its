import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";

const Navbar = props => (
    <nav>
        <div className="nav-wrapper">
            <div className="brand-logo"><Link to="/">[brakits]</Link></div>
            <ul>
                <ul className="right">
                <li><Link to="/signup" component={SignUp}>Sign Up</Link></li>
                <li><Link to="/SignIn" component={SignIn}>Sign In</Link></li>
                </ul>
            </ul>
        </div>
    </nav>
)



export default Navbar;