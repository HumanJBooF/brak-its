import React from 'react';
import Container from '../Container';
import Create from '../Create';
import styles from './SearchStyles';

const SearchBar = props => (
    <Container>
        <div className="row">
            <form className={props.loggedIn ? "col m6" : "col s12 offset-s2"}>
                <div className="row center-align left">
                    <input id="search" type="search" style={styles.searchbar} />
                    <label htmlFor="search" className="black-text">Search Tournaments!</label>
                </div>
            </form>
            {props.loggedIn
                ? <Create />
                : null}
        </div>
    </Container>
)

export default SearchBar;