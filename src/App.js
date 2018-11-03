import React from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


class App extends React.Component {

  componentDidMount () {
    axios.get("/api/test").then(data => {
      console.log("Api Response", data);
    });
  }

  render () {
    return (
      <div className='test'>HELLO!</div>
    );
  }
}

export default App;
