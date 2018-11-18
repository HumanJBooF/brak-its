import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Landing from './pages/Landing'
import TournCreate from "./pages/TournamentCreate";
import TournDisplay from "./pages/TournamentDisplay"
import API from './utils/API';


class App extends React.Component {

	state = {
		loggedIn: false,
		username: null,
		recentArr: [],
	}

	componentDidMount = () => {
		this.check_user();
		this.get_recent();
	}

	update_user = userObj => {
		this.setState(userObj);
	}

	check_user = () => {
		API.check_user().then(result => {
			!result.data.user
				? this.setState({
					loggedIn: false,
					username: null
				})
				: this.setState({
					loggedIn: true,
					username: result.data.user.username
				})
		})
	}
		// get_recent = () => {
		// 	API.show_recent()
		// 		.then(recent => {
		// 			console.log(recent.data.tournament);
		// 			const varArr = [];
		// 			recent.data.tournament.map( tourneys => {
		// 				// const tourneys = tourneys.tourneyName;
		// 				// const id = tourneys.uuid;
		// 				// console.log('name:', tourneys, '\n', 'id:', id);
						
		// 				varArr.tourneys = tourneys;
						
		// 			})
		// 			this.setState( {recentArr: varArr});
					
		// 		})
		// 		console.log('at', this.state.recentArr);
		// }
		
		get_recent = () => {
			API.show_recent()
				.then(recent => {
					const getTourneys = [];
					recent.data.tournament.forEach( tourneyElems => {
						const tourneyObj = { 
							name: tourneyElems.tourneyName,
							id: tourneyElems.uuid 
						}
						//looking to see if anything is there, it is not.
						//then it looks into tourney obj, and puts both into the array
						getTourneys.push(tourneyObj);
					
						console.log('in loop', getTourneys);
					})		
					this.setState({
							recentArr: [ ...this.state.recentArr, ...getTourneys]
						})
					// this.setState({ recentArr: getTourneys })
					
				})
		}
	
	
	render () {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path='/' render={() => <Landing update_user={this.update_user} loggedIn={this.state.loggedIn} username={this.state.username} recentArr={this.state.recentArr}  />} />
						<Route exact path='/signup' render={() => <SignUp update_user={this.update_user} />} />
						<Route exact path='/signin' render={() => <SignIn update_user={this.update_user} />} />
						<Route exact path='/tournament' render={() => <TournCreate username={this.state.username} update_user={this.props.update_user} loggedIn={this.state.loggedIn} />}/>
						<Route exact path='/display' component={TournDisplay} />
					</Switch>
				</div>
			</Router>
		)
	}
}
export default App;