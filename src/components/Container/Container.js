import React from "react";


const Container = ({ fluid, children }) => (
    <div className={ `conatiner${fluid ? "-fluid" : ""}`}>
        {children}
    </div>
)

export default Container;