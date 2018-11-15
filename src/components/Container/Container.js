import React from 'react';
import styles from "./ContainerStyle";


const Container = ({ fluid, children }) => (
    <div 
        className={`container ${fluid ? "-fluid" : ""}`}
        style={styles}    
    >
        {children}
    </div>
)

export default Container;