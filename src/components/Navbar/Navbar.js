import React from "react";
import "./Navbar.css";



const Navbar = props => (
    <nav>
        <div className="Nav-wrapper">
            <div className="container-fluid">
                <a href="#!" className="brand-logo">FUCK YE NAVBAR</a>
                <ul className="right">
                    <li><a href="/newUser">Create account</a></li>
                    <li><a href="../../routes/AuthRoutes/Login">login</a></li>
                    
                </ul>
            </div>
        </div>
    </nav>
)

export default Navbar;