import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from "./Components/peopleStarWars"
import Detail from "./Components/peopleDetail"
import Root from "./Components/root.js"
import Login from "./Components/login"
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {

  getSession(){
    
  }

render(){ 

  return (
<Router>
    <Route exact path={"/"} render={(props) => <Root/>}/>
    <Route exact path={"/peoples"} render={(props) => <People/>}/>
    <Route exact path={"/detail"} render={(props) => <Detail/>}/>
    <Route exact path={"/login"} render={(props) => <Login/>}/>
</Router>
  );
  }
}
export default App;
