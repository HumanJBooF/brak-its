import React from 'react';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';


class SignUp extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        usernameDescription: 'Username',
        emailDescription: 'Email',
        passwordDescription: 'Password',
        redirectTo: null
    }

    emailRegEx = RegExp(
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|io|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    )

    handle_submit = event => {
        event.preventDefault();

        console.log("form submitting")

        this.check_validity({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
            ? API.add_user({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then(result => {
                (!result.data.error)
                    ? this.setState({ redirectTo: '/signin' })
                    : this.setState({ usernameDescription: result.data.error })
            }).catch(error => console.log(error))
            // todo add a couldn't send
            : console.log('dont send');



    }

    check_validity (userInfo) {
        return (userInfo.username.length > 0) && (this.emailRegEx.test(userInfo.email)) && (userInfo.password.length >= 8) ? true : false
    }

    handle_change = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });

        switch (name) {
            case 'username':
                value.length === 0
                    ? this.setState({
                        usernameDescription: 'Please enter a valid username'
                    })
                    : this.setState({
                        usernameDescription: 'Valid username'
                    })
                break;
            case 'email':
                this.emailRegEx.test(value)
                    ? this.setState({
                        emailDescription: 'Valid Email'
                    })
                    : this.setState({
                        emailDescription: 'Please enter a valid email'
                    })
                break;
            case 'password':
                value.length >= 8
                    ? this.setState({
                        passwordDescription: 'Valid Password'
                    })
                    : this.setState({
                        passwordDescription: 'Password must be 8 characters or longer'
                    })
                break;
            default:
                // todo add a error function
                console.log('error')
        }
    }



    render () {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <>
                    <Navbar />
                    <Container>
                        <Card>
                            <header className="center-align s12">Sign Up!</header>
                            <div className="row">
                                <form onSubmit={this.handle_submit} className="col s12 center-align" noValidate>
                                    <div className="row">
                                        <div className="username">
                                            <div className="input field col m6 center-align">
                                                <input
                                                    id="userName"
                                                    name="username"
                                                    type="text"
                                                    className="validate"
                                                    onChange={this.handle_change}
                                                />
                                                <label htmlFor="userName">{this.state.usernameDescription}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input field col m6 center-align">
                                            <input
                                                id="Email"
                                                name="email"
                                                type="text"
                                                className="validate"
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="Email">{this.state.emailDescription}</label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="center-align input field col m6">
                                            <input
                                                id="passWord"
                                                name="password"
                                                type="password"
                                                noValidate
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="passWord">{this.state.passwordDescription}</label>

                                        </div>
                                    </div>
                                    <button className="btn btn-large" type="submit"> sign up!</button>
                                </form>
                            </div>
                        </Card>
                    </Container>
                </>
            )
        }
    }
}
export default SignUp;
