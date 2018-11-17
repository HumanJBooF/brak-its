import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import API from '../../utils/API';
import Card from "../../components/Card";
import DatePicker from "react-date-picker";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import styles from "./TournyStyles"

class TournCreate extends React.Component {

    state = {
        tourneyName: '',
        type: '',
        description: '',
        size: '',
        date: new Date(),
        owner: '',
        nameError: '',
        typeError: '',
        DescriptError: '',
        username: this.props.username
    }

    //RegEx to remove all special charcters 
    //EXCEPT: spaces - dashes - underscores (allows upper, lower, and numeric)
<<<<<<< HEAD
    removeSpecials = RegExp(/^([a-zA-Z0-9_\s\-]*)$/)
    componentDidMount() {
        M.AutoInit();
    }
=======
    removeSpecials = RegExp(/^([a-zA-Z0-9_\s]*)$/)

>>>>>>> 15dd802314403bdc44878d0f32e17b95dd06c2a3
    //handle click to grab the value of the drop-down clicked.
    handle_click = event => {
        // const chosenSize = event.currentTarget.dataset.id;
        this.setState({ size: event.currentTarget.dataset.id });
        console.log(this.state.size);
    }

    handle_validity = tourneyInfo => {
        console.log(tourneyInfo)
        return (tourneyInfo.tourneyName.length > 0)
            && (this.removeSpecials.test(tourneyInfo.tourneyName))
            && (tourneyInfo.description.length <= 250
                & tourneyInfo.description.length > 0) ? true : false;
    }

    handle_submit = event => {
        event.preventDefault();
        console.log(this.state);
        this.handle_validity({
            tourneyName: this.state.tourneyName,
            description: this.state.description,
            type: this.state.type,
        })

            ? API.create_tournament({
                tourneyName: this.state.tourneyName,
                type: this.state.type,
                description: this.state.description,
                date: this.state.date,
                size: this.state.size,
                owner: this.state.username
            }).then(newTourny => {
                console.log('added yo')
            })
            : console.log(`didn't send`)
    }

    handle_change = event => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        console.log(this.state.date)
        console.log(this.state.tournyName);
        switch (name) {
            case 'tourneyName':
                value.length > 3
                    && this.removeSpecials.test(value)
                    ? this.setState({ nameError: "proper Tournament name" })
                    : this.setState({ nameError: "Now that's not a proper name!" })
                break;
            case 'type':
                value.length <= 35 & value.length > 3
                    ? this.setState({ typeError: "GAME ON!" })
                    : this.setState({ typeError: "You sure that's a real game?" })
                break;
            case 'description':
                value.length <= 250 & value.length > 10
                    ? this.setState({ descriptError: "Very Descriptive" })
                    : this.setState({ descriptError: "Brevity is a virtue!" })
                break;
            default:
                //append something below the "form" to say invalid form"
                console.log('invalid form');
                break;
        }
    }



    render() {
        return (
            <>
                <Navbar update_user={this.props.update_user} username={this.props.username} loggedIn={this.props.loggedIn} />
                <Container>
<<<<<<< HEAD
                    <div className="section white z-depth-3">
                        <div className="row">
                            <form onSubmit={this.handle_submit} noValidate>
                                <p>Enter your name</p>
                                <input
                                    type="text"
                                    name="tourneyName"
                                    id="tName"
                                    maxLength="50"
                                    onChange={this.handle_change}
                                    className="col s12"
                                />
                                <label htmlFor="tName">{this.state.nameError}</label>
                                <p>Enter the game type</p>
                                <input
                                    type="text"
                                    name="type"
                                    id="tType"
                                    maxLength="35"
                                    onChange={this.handle_change}
                                    className="col s12"
                                />
                                <label htmlFor="tType">{this.state.typeError}</label>
                                <p>Enter game description</p>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="textarea"
                                    maxLength="250"
                                    onChange={this.handle_change}
                                    className="col s6"
                                />
                                <label htmlFor="textarea">{this.state.descriptError}</label>

                                <DatePicker
                                    onClick={this.handle_click}
                                    value={this.state.date}
                                    className=""
                                    style={styles.calen}
                                />
                                <a className='dropdown-trigger btn left' href='#' data-target='dropdown1'style={styles.posDrop}>Select Size</a>
                                <ul  id='dropdown1' className='dropdown-content' onClick={() => console.log("clicked")}>
                                    <li>
                                        <h4
                                            className="center-align"
                                            onClick={this.handle_click.bind(this)}
                                            data-id="4"> 4
=======
                    <div className="row">
                        <form onSubmit={this.handle_submit} noValidate>
                            <input
                                type="text"
                                name="tourneyName"
                                id="tName"
                                maxLength="50"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="tName">{this.state.nameError}</label>

                            <input
                                type="text"
                                name="type"
                                id="tType"
                                maxLength="35"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="tType">{this.state.typeError}</label>

                            <textarea
                                type="text"
                                name="description"
                                id="textarea"
                                maxLength="250"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="textarea">{this.state.descriptError}</label>

                            <input type="date" name="date" />
                            <label htmlFor="date">Select Tournament date</label>
                            <br /><br />

                            <a className='dropdown-trigger btn left' data-target='dropdown1'>Select Size</a>
                            <ul id='dropdown1' className='dropdown-content'>
                                <li>
                                    <h4
                                        className="center-align"
                                        onClick={this.handle_click.bind(this)}
                                        data-id="4"> 4
>>>>>>> 15dd802314403bdc44878d0f32e17b95dd06c2a3
                                        </h4>
                                    </li>
                                    <li>
                                        <h4
                                            className="center-align"
                                            onClick={this.handle_click.bind(this)}
                                            data-id="8"> 8
                                        </h4>
                                    </li>
                                    <li>
                                        <h4
                                            className="center-align"
                                            onClick={this.handle_click.bind(this)}
                                            data-id="16"> 16
                                        </h4>
                                    </li>
                                    <li>
                                        <h4 className="center-align"
                                            onClick={this.handle_click.bind(this)}
                                            data-id="32"> 32
                                        </h4>
                                    </li>
                                </ul>
                                    <button 
                                        style={styles.createbtn} 
                                        className="btn left col s12" 
                                        onClick={() => console.log(`clicked`)} 
                                        type="submit"
                                    >
                                        Create Tournament!
                                    </button>
                            </form>
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}

export default TournCreate;