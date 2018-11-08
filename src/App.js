import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing"

const App = () => (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/signin" component={SignIn} />
			</Switch>
		</div>
	</Router>
)

export default App;