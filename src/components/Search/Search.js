import React from 'react';
import Container from '../Container';
import CreateButton from '../Create';

const searchStyles = {

    marginTop: "5vh",
    backgroundColor: "grey",
    color: "white",
    borderRadius: "20px",
    zIndex: "5",
    border: "1px solid white",
    fontWeight: "Bold",
    width: "100%",

}

const SearchBar = () => (
    <Container>
        <div className="row">
            <form className="col s6">
                <div className="row center-align left">
                    <input id="search" type="search" style={searchStyles} />
                    <label htmlFor="search" className="black-text">Search Tournaments!</label>
                </div>
            </form>
            <CreateButton />
        </div>
    </Container>
)

export default SearchBar;