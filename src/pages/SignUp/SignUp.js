import React from "react";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";


const emailRegEx = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

const form_valid = ({ formErrors, ...rest }) => {
    let isValid = true;
    //validate form errors beign empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (isValid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (isValid = false);
    });
    
    console.log(isValid)
    return isValid
}

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            formErrors: {
                username: "",
                email: "",
                password: ""
            }
        }
    }

    handle_submit = event => {
        event.preventDefault();

        if (!form_valid(this.state)) {
            console.log(`
            -------SUBMITTING-------
            username: ${this.state.username}
            email:    ${this.state.email}
            password: ${this.state.password}
            `)

            API.addUser({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                UUID: Math.random().toString // todo : Temp, untill UUID is set up
            }).catch(error => console.log(error))
        } else {
            console.log("INVALID FORM ENTRY");
            console.log(this.state.formErrors)
        }

    }

    handle_change = event => {
        event.preventDefault();

        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors }

        switch (name) {
            case 'username':
                formErrors.username = value.length > 0;
                break;
            case 'email':
                formErrors.email = emailRegEx.test(value)
                    ? "Valid Email Address"
                    : "Invalid Email Address"
                break;
            case 'password':
                formErrors.password =
                    value.length < 8
                        ? "Passwords must contain at least 8 characters"
                        : ""
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value },
            _cb => console.log(this.state));
    }



    render() {
        const { formErrors } = this.state;

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
                                            {formErrors.username.length > 0 && (
                                                <span className="errorMessage">{formErrors.username}</span>
                                            )}
                                            <label htmlFor="userName">UserName:</label>
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
                                        {formErrors.email.length > 0 && (
                                            <span className="errorMessage">{formErrors.email}</span>
                                        )}
                                        <label htmlFor="Email">Email:</label>
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
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                        <label htmlFor="passWord">Password:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="center-align input field col m6">
                                        <input
                                            id="passWordValidate"
                                            name="passwordValidate"
                                            type="password"
                                            noValidate
                                            onChange={this.handle_change}
                                        />
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
export default SignUp;
