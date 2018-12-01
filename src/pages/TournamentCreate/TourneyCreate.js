import React from 'react';
import { Redirect } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Card from '../../components/Card';
import styles from './TourneyStyles';
import API from '../../utils/API';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import M from 'materialize-css/dist/js/materialize.min.js';

class TournCreate extends React.Component {
    state = {
        tourneyName: '',
        gameType: '',
        description: '',
        sizeLimit: '',
        startDate: new Date(),
        owner: '',
        nameError: '',
        typeError: '',
        DescriptError: '',
        username: this.props.username,
        showSize: 'Select Size',
        redirectTo: null
    }

    componentDidMount () {
        M.AutoInit()
    }

    //RegEx to remove all special charcters 
    //EXCEPT: spaces - dashes - underscores (allows upper, lower, and numeric)
    removeSpecials = RegExp(/^([a-zA-Z0-9_\s]*)$/)

    //handle click to grab the value of the drop-down clicked.
    handle_click = event => {
        this.setState({
            sizeLimit: event.currentTarget.dataset.id,
            showSize: `Chosen Size  ${event.currentTarget.dataset.id}`
        })
    }

    handle_validity = tourneyInfo => {
        return (tourneyInfo.tourneyName.length > 0)
            && (this.removeSpecials.test(tourneyInfo.tourneyName))
            && (tourneyInfo.description.length <= 250
                & tourneyInfo.description.length > 0) ? true : false;
    }

    handle_date = date => {
        this.setState({ startDate: date }, () => {
            console.log(this.state.date);
        })
    }

    handle_submit = (event, date) => {
        event.preventDefault();
        this.setState({ startDate: date }, () => {
            console.log(this.state.startDate)
        });

        this.handle_validity({
            tourneyName: this.state.tourneyName,
            description: this.state.description
        })
            ? API.create_tournament({
                tourneyName: this.state.tourneyName,
                gameType: this.state.gameType,
                description: this.state.description,
                date: this.state.startDate,
                sizeLimit: this.state.sizeLimit,
                owner: this.state.username
            }).then(newTourny => {
                console.log('added yo')
                this.setState({
                    redirectTo: `/join/${newTourny.data.tournament.owner}/${newTourny.data.tournament.uuid}`
                })
            })
            : console.log(`didn't send`)
    }

    handle_change = (event, date) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });

        switch (name) {
            case 'tourneyName':
                value.length > 3
                    && this.removeSpecials.test(value)
                    ? this.setState({ nameError: "proper Tournament name" })
                    : this.setState({ nameError: "Now that's not a proper name!" })
                break;
            case 'gameType':
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

    //I bless the rains down in africa

    render () {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <>
                    <Navbar
                        update_user={this.props.update_user}
                        username={this.props.username}
                        loggedIn={this.props.loggedIn}
                    />
                    <Container>

                        {/* <div className="row"> */}
                        <div className="wrap" style={styles.wrap}>
                            <form onSubmit={this.handle_submit} noValidate>
                                <Container>
                                    <div className="row">
                                        <p>Enter your name</p>
                                        <input
                                            type="text"
                                            name="tourneyName"
                                            id="tName"
                                            maxLength="50"
                                            onChange={this.handle_change}
                                            className="col s12"
                                            style={styles.inputs}
                                        />
                                        <label htmlFor="tName">{this.state.nameError}</label>
                                        <p>Enter the game type</p>
                                        <input
                                            type="text"
                                            name="gameType"
                                            id="tType"
                                            maxLength="35"
                                            onChange={this.handle_change}
                                            className="col s12"
                                            style={styles.inputs}
                                        />
                                        <label htmlFor="tType">{this.state.typeError}</label>
                                        <div className="row">
                                            <h6 className="center-align">Enter game description</h6>
                                            <textarea
                                                type="text"
                                                name="description"
                                                id="textarea"
                                                maxLength="250"
                                                onChange={this.handle_change}
                                                className="white col s12"
                                                style={styles.textArea}

                                            />
                                            <label htmlFor="textarea">{this.state.descriptError}</label>
                                        </div>
                                    </div>
                                </Container>
                                <div className="row">
                                    <Container>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            showTimeSelect
                                            timeFormat="h:mm a"
                                            timeIntervals={60}
                                            dateFormat="MMMM d, yyyy h:mm a"
                                            timeCaption="Time"
                                            className=""
                                        />

                                        <a className='dropdown-trigger btn left light-blue col s5' data-target='dropdown1' style={styles.posDrop}>{this.state.showSize}</a>
                                        <ul id='dropdown1' className='dropdown-content'>
                                            <li>
                                                <h4
                                                    className="center-align"
                                                    onClick={this.handle_click.bind(this)}
                                                    data-id="4"> 4
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
                                    </Container>
                                    <button
                                        style={styles.createbtn}
                                        className="btn left light-blue col s12"
                                        type="submit"
                                    >
                                        Create Tournament!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Container>
                </>
            )
        }
    }
}

export default TournCreate;