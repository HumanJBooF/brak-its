import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'materialize-css/dist/css/materialize.min.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Landing from './pages/Landing'
import TournCreate from './pages/TournamentCreate';
import TournDisplay from './pages/TournamentDisplay';
import TourneyJoin from './pages/TournamentJoin';
import API from './utils/API';
import SearchPage from './pages/SearchPage';

class App extends React.Component {

	state = {
		loggedIn: false,
		username: null
	}

	componentDidMount = () => {
		this.check_user();
	}

	update_user = userObj => {
		this.setState(userObj);
	}

	check_user = () => {
		API.check_user().then(result => {
			!result.data.username
				? this.setState({
					loggedIn: false,
					username: null
				})
				: this.setState({
					loggedIn: true,
					username: result.data.username
				});
		});
	}

	render () {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path='/'
							render={() => <Landing
								update_user={this.update_user}
								loggedIn={this.state.loggedIn}
								username={this.state.username}
							/>}
						/>
						<Route exact path='/signup'
							render={() => <SignUp
								update_user={this.update_user}
							/>}
						/>
						<Route exact path='/signin'
							render={() => <SignIn
								update_user={this.update_user}
							/>}
						/>
						<Route exact path='/tournament'
							render={() => <TournCreate
								username={this.state.username}
								update_user={this.update_user}
								loggedIn={this.state.loggedIn}
							/>}
						/>
						<Route exact path='/display/:name/:owner/:id'
							render={props => <TournDisplay
								{...props}
								username={this.state.username}
								update_user={this.update_user}
								loggedIn={this.state.loggedIn}
							/>}
						/>
						<Route exact path='/join/:owner/:id'
							render={props => <TourneyJoin
								{...props}
								update_user={this.update_user}
								username={this.state.username}
								loggedIn={this.state.loggedIn}
							/>}
						/>

						<Route exact path='/search/:search'
							render={props => <SearchPage
								{...props}
								update_user={this.update_user}
								username={this.state.username}
								loggedIn={this.state.loggedIn}
							/>}
						/>

					</Switch>
				</div>
			</Router>
		)
	}
}
export default App;