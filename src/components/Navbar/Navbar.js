import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";

const Navbar = () => (
    <nav className="blue-grey ligthen-5">
        <div className="nav-wrapper">
            <div className="brand-logo"><Link to="/">[brakits]</Link></div>

            <ul className="right">
                <li><Link to="/signup" component={SignUp}>Sign Up</Link></li>
                <li><Link to="/signin" component={SignIn}>Sign In</Link></li>
            </ul>
        </div>
    </nav>
)



export default Navbar;