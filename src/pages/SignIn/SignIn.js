import React from "react";
import ReactDom from 'react-dom';
import Container from "../../components/Container";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";




class SignIn extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userLogin: null,
            userPass:  null
        }
    }

    handle_change = event => {
        event.preventDefault();

        const { name, value } = event.target;


    }

    hanle_submit = event => {
        event.preventDefault();

    }

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <Card>
                        <header className="center-align s12">Sign In!</header>
                        <div className="row">
                            <form onSubmit={this.handle_submit} className="col s12 center-align">
                                <div className="row">
                                    <div className="userLogin">
                                        <div className="input field col m6 center-align">
                                            <input
                                                id="userlogin"
                                                name="userLogin"
                                                type="text"
                                                className="validate"
                                                onChange={this.handle_change}
                                            />

                                            <label htmlFor="userlogin">Username: </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input fieldfeild col m6 center-align">
                                        <input
                                            id="userpass"
                                            name="userPass"
                                            type="text"
                                            noValidate
                                            onChange={this.handle_change}
                                        />

                                        <label htmlFor="userPass">Password: </label>
                                    </div>
                                </div>
                                <button className="btn btn-large" type="submit"> sign in!</button>
                            </form>
                        </div>
                    </Card>
                </Container>
            </>
        )
    }
}

export default SignIn;