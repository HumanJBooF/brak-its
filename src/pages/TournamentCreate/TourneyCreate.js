import React from 'react';
import { Redirect } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import styles from './TourneyStyles';
import API from '../../utils/API';
import Footer from '../../components/Footer';
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

    handle_submit = (event) => {
        event.preventDefault();

        console.log(this.state.startDate)


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
                value.length > 10
                    ? this.setState({ descriptError: "Very Descriptive" })
                    : this.setState({ descriptError: "More description please!" })
                break;
            default:

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
                        <div className="card" style={styles.cardArea}>
                            <h4 className="center-align" style={styles.head}> Create Tournament </h4>
                            <div className="wrap" style={styles.wrap}>
                                <form onSubmit={this.handle_submit} noValidate>
                                    <Container>
                                        <div className="row">
                                            <p style={styles.ptag}>Enter your name</p>
                                            <input
                                                type="text"
                                                name="tourneyName"
                                                id="tName"
                                                maxLength="50"
                                                onChange={this.handle_change}
                                                className="col s6"
                                                style={styles.inputs}
                                            />
                                            <label style={styles.labels} htmlFor="tName">{this.state.nameError}</label>

                                              <a 
                                                className='dropdown-trigger btn-large left  col s5 right z-depth-3' 
                                                data-target='dropdown1' 
                                                style={styles.posDrop}>{this.state.showSize}
                                            </a>
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
                                                {/* <li>
                                                    <h4 className="center-align"
                                                        onClick={this.handle_click.bind(this)}
                                                        data-id="32"> 32
                                                 </h4>
                                                </li>
                                                <li>
                                                    <h4 className="center-align"
                                                        onClick={this.handle_click.bind(this)}
                                                        data-id="64"> 64
                                                 </h4>
                                                </li>
                                                <li>
                                                    <h4 className="center-align"
                                                        onClick={this.handle_click.bind(this)}
                                                        data-id="128"> 128
                                                 </h4>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="row"> 
                                            <i className="fas fa-gamepad fa-9x right"></i>
                                            <p style={styles.ptag}>Enter the game type</p>
                                            <input
                                                type="text"
                                                name="gameType"
                                                id="tType"
                                                maxLength="35"
                                                onChange={this.handle_change}
                                                className="col s6"
                                                style={styles.inputs}
                                            />
                                           
                                            <label htmlFor="tType"><h5>{this.state.typeError}</h5></label>
                                        </div>
                                        <div className="row">
                                            <h6 className="center-align" style={styles.ptag}>Enter game description</h6>
                                            <textarea
                                                type="text"
                                                name="description"
                                                id="textarea"
                                                maxLength="250"
                                                onChange={this.handle_change}
                                                className="col s12 tooltipped" 
                                                data-position="bottom" 
                                                data-tooltip="Please Don't forget to add the date and time! of your event!z"
                                                style={styles.textArea}
                                                placeholder=""
                                                
                                            />
                                            {/* <label placeholder="PLEASE ADD THE TIME & DATE OF YOUR TOURNAMENT:D" htmlFor="textarea"></label> */}
                                            <label htmlFor="textarea"><h5>{this.state.descriptError}</h5></label>
                                        </div>
                                        {/* </div> */}
                                    </Container>
                                    <div className="row">
                                        <button
                                            style={styles.createbtn}
                                            className="btn left light-blue waves-effect hoverable col s12"
                                            type="submit"
                                    > <h6>Create Tournament!</h6>
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Container>
                    <Footer />
                </>
            )
        }
    }
}

export default TournCreate;