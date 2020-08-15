import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import {Grid} from "@material-ui/core"
import espace from '../Img/espace.jpg'
import { makeStyles } from '@material-ui/core/styles';

export default class root extends React.Component {


   
  render() {
  	return(
		<div>
			<p>API Star Wars</p>
			<li><NavLink to={"/peoples"}>List of Characters</NavLink></li>
		</div>
	)
  }
}