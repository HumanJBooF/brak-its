import React from "react";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Card from "../../components/Card";
// import API from '../../utils/API';

class SignIn extends React.Component {

    state = {
        username: '',
        password: ''
    }

    check_validity (userInfo) {
        return (userInfo.username.length > 0) && (userInfo.password.length >= 8) ? true : false
    }

    handle_change = event => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    handle_submit = event => {
        event.preventDefault();

        console.log("here");

        // this.check_validity({
        //     username: this.state.username,
        //     password: this.state.password
        // })
        //     ? API.find_user({
        //         username: this.state.username,
        //         password: this.state.password
        //     }).then(dbUser => {
        //         console.log(dbUser);
        //     }).catch(error => console.log(error))
        //     // todo add a couldn't send
        //     : console.log('dont send')

    }

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <Card>
                        <header className="center-align s12">Sign In!</header>
                        <div className="row">
                            <form onSubmit={this.handle_submit} className="col s12 center-align" noValidate>
                                <div className="row">
                                    <div className="input field col m6 center-align username">
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            className="validate"
                                            onChange={this.handle_change}
                                        />
                                        <label htmlFor="username">UserName</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="center-align input field col m6">
                                        <input
                                            name="password"
                                            id="password"
                                            type="password"
                                            className="validate"
                                            onChange={this.handle_change}
                                        />
                                        <label htmlFor="password">Password</label>

                                    </div><div className="btn btn-large" > sign in!</div>
                                </div>
                            </form>
                        </div>
                    </Card>
                </Container>
            </>
        )
    }
}

export default SignIn;