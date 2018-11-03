import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';

class App extends React.Component {

  componentDidMount () {
    axios.get("/api/test").then(data => {
      console.log("Api Response", data);
    });
  }

  render () {
    return (
      <Navbar />
    );
  }
}

export default App;
