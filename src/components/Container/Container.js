import React from 'react';
<<<<<<< HEAD

const Container = ({ fluid, children }) => (
    <div 
        className={`container ${fluid ? "-fluid" : ""}`}>
=======



const Container = ({ fluid, children }) => (
    <div 
        className={`container ${fluid ? "-fluid" : ""}`}   
    >
>>>>>>> 3e35f0788492da59adfe17f80cc74decccd8d1de
        {children}
    </div>
)

export default Container;