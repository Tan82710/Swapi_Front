import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

export default class root extends React.Component {

   
  render() {
  	return(
		<div className="main">
			<p>API Star Wars</p>
			<li><NavLink to={"/peoples"}>List of Characters</NavLink></li>
		</div>
	)
  }
}