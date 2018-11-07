 import React from "react";
 import Container from "../Container";
 import CreateButton from "../Create";

 const SearchBar = () => (
     <Container>
     <div className="row">
        <form className="col s6">
            <div className="row center-align">
              <input id="search" type="search"/>
              <label for="search" >Search Tournaments!</label>
            </div> 
        </form>
        <CreateButton />
     </div>
    </Container>
 )

 export default SearchBar;