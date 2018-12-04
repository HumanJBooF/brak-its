import React from 'react';
import './searchStyles.css';

const SearchBar = props => (
    <div className="col s4 offset-s1">
        <div className="card horizontal z-depth-5" id="box">
            <div className="card-content col s12">
                <form className="col s12 center-align">
                    <input
                        id="search" type="search"
                        placeholder="Search for tournaments!"
                        onChange={event => props.on_change(event)}
                        className="autocomplete-input"
                    />
                    <button onClick={props.onClick} className="col s12 btn light-blue hide-on-med-and-down">
                        <i
                            className="material-icons"
                        >search
                        </i>
                    </button>
                </form>
            </div>
        </div>
    </div>
)

export default SearchBar;