import React from 'react';
import Container from '../Container';
import styles from './SearchStyles';

const SearchBar = props => (
    <Container>
        <div className="row">
            <form className={props.loggedIn ? "col s6" : "col s6 center-align"}>
                <div className="">
                    <button onClick={props.onClick} className="btn light-blue hide-on-med-and-down" style={styles.searchIcon}>
                        <i
                            className="material-icons"
                        >search
                        </i>
                    </button>
                    <input
                        id="search" type="search"
                        placeholder="Search for tournaments!"
                        style={styles.searchBar}
                        onChange={event => props.on_change(event)}
                        className="autocomplete-input offset-s6"
                    />
                </div>
            </form>
        </div>
    </Container>
)

export default SearchBar;