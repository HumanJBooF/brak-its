import React from 'react';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import Button from "../../components/Button"
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2'
import Footer from '../../components/Footer'
import './SignUpStyles.css';


class SignUp extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirm: '',
        usernameDescription: 'Username',
        emailDescription: 'Email',
        passwordDescription: 'Password',
        passwordConfirm: 'Confirm Your Password',
        redirectTo: null,
        btn: "Sign Up!"
    }

    emailRegEx = RegExp(
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|io|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|ch|)\b/
    )



    handle_submit = event => {
        event.preventDefault();

        console.log("form submitting")

        this.check_validity({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirm: this.state.confirm
        })
            //nested ternary here
            ? API.add_user({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then(result => {
                (!result.data.error)

                    ? API.find_user({
                        username: this.state.username,
                        password: this.state.password,
                    }).then(user => {
                        if (user.data) {
                            this.props.update_user({
                                loggedIn: true,
                                username: user.data.username
                            });

                            swal(`Welcome to [Brakits] \n ${this.state.username}`, "Game On!", "success")
                                .then((onClick => {
                                    this.setState({ redirectTo: '/' });
                                }));
                        }
                    })

                    : this.setState({ usernameDescription: result.data.error })

            }).catch(error => console.log(error))
            // todo add a couldn't send
            : swal({
                type: 'error',
                title: 'Oops...Something went wrong!',
                text: 'Double check the forms validation messages!',
            });

        console.log(this.state.username)
    }

    check_validity = userInfo => {
        return (userInfo.username.length > 0)
            && (this.emailRegEx.test(userInfo.email))
            && (userInfo.password.length >= 8
                && userInfo.password === userInfo.confirm) ? true : false
    }

    handle_change = event => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });

        switch (name) {
            case 'username':
                value.length === 0
                    ? this.setState({ usernameDescription: 'Please enter a valid username' })
                    : this.setState({ usernameDescription: 'Valid username' })
                break;
            case 'email':
                this.emailRegEx.test(value)
                    ? this.setState({ emailDescription: 'Valid Email' })
                    : this.setState({ emailDescription: 'Please enter a valid email' })
                break;
            case 'password':
                value.length >= 8
                    ? this.setState({ passwordDescription: 'Valid Password' })
                    : this.setState({ passwordDescription: 'Password must be 8 characters or longer' })
                break;
            default:
                //error function -> yet to be tested, but should be valid
                if (this.state.hasError)
                    return console.log(this.state.error);
                //add sweetalert
                break;
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
                            <header className="center-align s12 hide-on-med-and-down">
                                <h4 className="header">Enter your Credentials</h4>
                            </header>
                            <div className="row">
                                <form onSubmit={this.handle_submit} className="col s12" noValidate>
                                    <div className="row">
                                        <div className="username">
                                            <div className="input field col s12 center-align ">
                                                <input
                                                    id="formStyles"
                                                    name="username"
                                                    type="text"
                                                    className="validate"
                                                    onChange={this.handle_change}
                                                />
                                                <label htmlFor="userName">\
                                                    <p className="tags">{this.state.usernameDescription}</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input field col s12 center-align">
                                            <input
                                                id="formStyles"
                                                name="email"
                                                type="text"
                                                className="validate"
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="Email">
                                                <p className="tags">{this.state.emailDescription}</p>
                                            </label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="center-align input field col s12">
                                            <input
                                                id="formStyles"
                                                name="password"
                                                type="password"
                                                noValidate
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="passWord">
                                                <p className="tags">{this.state.passwordDescription}</p>
                                            </label>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="center-align input field col s12">
                                            <input
                                                id="formStyles"
                                                name="confirm"
                                                type="password"
                                                noValidate
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="password">
                                                <p className="tags">{this.state.passwordConfirm}</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Button
                                            btn={this.state.btn}
                                        />
                                    </div>
                                </form>
                            </div>
                        </Card>
                        <Footer />
                    </Container>
                </>
            )
        }
    }
}
export default SignUp;