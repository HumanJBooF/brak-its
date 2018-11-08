import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing"



class App extends React.Component {

  componentDidMount() {
    axios.get("/api/test").then(data => {
      console.log("Api Response", data);
    });
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/api/signup" component={SignUp} />
            <Route exact path="/api/signin" component={SignIn} />
          </div>
        </Router>
     </>
    );
  }
}

export default App;
