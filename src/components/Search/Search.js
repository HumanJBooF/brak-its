import React from 'react';
import Container from '../Container';
import CreateButton from '../Create';
import styles from './SearchStyles';

const SearchBar = () => (
    <Container>
        <div className="row">
            <form className="col s6">
                <div className="row center-align left">
                    <input id="search" type="search" style={styles.searchBar} />
                    <label htmlFor="search" className="black-text">Search Tournaments!</label>
                </div>
            </form>
            <CreateButton />
        </div>
    </Container>
)

export default SearchBar;