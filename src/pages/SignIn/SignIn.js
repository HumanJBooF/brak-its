import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Button from '../../components/Button';
import API from '../../utils/API';
import swal from 'sweetalert2'
import Footer from '../../components/Footer';
import './SignInStyles.css';

class SignIn extends React.Component {

    state = {
        username: '',
        password: '',
        redirectTo: null,
        btn: 'Sign In!',
    }

    check_validity (userInfo) {
        return (userInfo.username.length > 0)
            && (userInfo.password.length >= 8) ? true : false
    }

    handle_change = event => {
        event.preventDefault();

        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    handle_submit = event => {
        event.preventDefault();

        console.log(`attempting login`);

        this.check_validity({
            username: this.state.username,
            password: this.state.password
        })
            ? API.find_user({
                username: this.state.username,
                password: this.state.password
            }).then(user => {
                if (user.data) {
                    this.props.update_user({
                        loggedIn: true,
                        username: user.data.username
                    })
                    this.setState({ redirectTo: '/' });

                    //custom swal
                    const toast = swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    toast({
                        type: 'success',
                        title: 'Signed in successfully'
                    })
                }
            }).catch(error => console.log(error))
            // todo add a couldn't send
            : swal({
                type: 'error',
                title: 'Oh No!',
                text: 'It seems we can\'t find matching login credentials try again!',
            });



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
                            <header className="center-align s12">
                                <h4 className="header">Sign In!</h4>
                            </header>
                            <div className="row">
                                <form
                                    onSubmit={this.handle_submit}
                                    className="col s12"
                                    noValidate>
                                    <div className="row">
                                        <div className="input field col s12 center-align username">

                                            <input
                                                id="formStyles"
                                                type="text"
                                                name="username"
                                                className="validate"
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="username" className="">
                                                <p className="tags">Username</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="center-align input field col s12">
                                            <input
                                                name="password"
                                                id="formStyles"
                                                type="password"
                                                className="validate"
                                                onChange={this.handle_change}
                                            />
                                            <label htmlFor="password" className="center-align">
                                                <p className="tags">Password</p>
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
                    </Container >
                    <Footer />
                </>
            )
        }
    }
}

export default SignIn;