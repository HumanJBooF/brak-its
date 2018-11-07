import React from "react";
import Container from "../Container"

const btnStyles = {
    "marginTop":"5vh",
     width:      "250px"
}

const CreateButton = () => (
    <Container>
         <a href="/"className="btn btn-large waves-effect right" style={btnStyles}>
            Create
         </a>
    </Container>
)

export default CreateButton;