import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Landing from './pages/Landing'
import TournCreate from "./pages/TournamentCreate";
import TournDisplay from "./pages/TournamentCreate/TournamentDisplay"
import API from './utils/API';

class App extends React.Component {

	state = {
		loggedIn: false,
		username: null
	}

	componentDidMount = () => {
		this.check_user()
	}

	update_user = userObj => {
		this.setState(userObj);
	}

	check_user () {
		API.check_user().then( result => {
			result.data.user
				? this.setState({
					loggedIn: true,
					username: result.data.user.username
				})
				: this.setState({
					loggedIn: false,
					username: null
				})
		})
	}
	render () {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path='/' render={() => <Landing update_user={this.update_user} loggedIn={this.state.loggedIn} username={this.state.username} />} />
						<Route exact path='/signup' render={() => <SignUp update_user={this.update_user} />} />
						<Route exact path='/signin' render={() => <SignIn update_user={this.update_user} />} />
    		    		<Route exact path='/tournament' component={TournCreate} />
						<Route exact path='/display'    component={TournDisplay} />
					</Switch>
				</div>
			</Router>
		)
	}
}
export default App;