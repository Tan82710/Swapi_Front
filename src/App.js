import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from "./Components/peopleStarWars"
import Detail from "./Components/peopleDetail"
import Root from "./Components/root.js"
import Login from "./Components/login"
import Error from "./Components/errorPage"
import {ProtectedRoot} from "./Components/protected.root"
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

class App extends React.Component {

render(){ 
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} render={(props) => <Root/>}/>
        <ProtectedRoot exact path={'/peoples'} component={People}/>
        <ProtectedRoot exact path={"/detail"} component={Detail}/>
        <Route exact path={"/login"} component={Login} />
        <Route exact path="*" component={Error} />
      </Switch>
    </Router>
  );
  }
}
export default App;
