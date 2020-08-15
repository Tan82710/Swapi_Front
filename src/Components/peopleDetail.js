import React, { Component } from 'react';
import espace from '../Img/espaceModif.jpg';
import naboo from '../Img/naboo.jpg'
import tatooine from '../Img/tatooine.jpg'
import alderaan from '../Img/alderaan.jpg'
import {Paper} from '@material-ui/core';
import  './component.css' 

export default class Detail extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			apiResponse : [],
			filmsResponse : [],
			filmsArray : [],
			id : '',
			inputValue: [],
			urlFilm : [],
			film : [],
			background : ''
		}
	}

	componentDidMount() {
		const url = window.location.href
		const splitId = url.split("http://localhost:3000/detail?id=")
		const id = splitId[1]
		this.state.id = id
		console.log(id)
		this.callAPI(id)
		this.callFilms(id)
		this.callAPIFilms()

	  }

	callAPI(id) {
		fetch(`http://localhost:4200/detail/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ apiResponse: res}))
		.catch(err => err)
		
	}

	callFilms(id){
		fetch(`http://localhost:4200/detail/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ filmsArray: res.films}))
		.catch(err => err)
	}

	callAPIFilms(){
		fetch(`http://localhost:4200/films/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ filmsResponse: res.results}))
		.catch(err => err)
	}

	
	callAPIFilm(id){
		fetch(`http://localhost:4200/films/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ film: res.results}))
		.catch(err => err)
	}

  render() {

	const data = this.state.apiResponse
	const arrayFilm = this.state.filmsArray
	const dataFilms = this.state.filmsResponse

	const listfilms = dataFilms.map((film) => {
		this.state.urlFilm = film.url.charAt(film.url.length-2)
		const url = this.state.urlFilm
		console.log(url)
		return film.title
})

const arrayUrl = arrayFilm.map(res => {
	this.state.id = res.charAt(res.length-2)
	const id = this.state.id
	return id
})

const url = data.homeworld
let background
let homeworld
switch(url) {
	case "http://swapi.dev/api/planets/1/" : 
	background = tatooine
	homeworld = 'Tatooine'
	break;
	case "http://swapi.dev/api/planets/2/" : 
	background = alderaan
	homeworld = 'Alderaan'
	break;
	case "http://swapi.dev/api/planets/8/" : 
	background = naboo
	homeworld = 'Naboo'
	break;
	default : background = espace
}

  	return(
	<div className="background" style={{			  
		backgroundImage: `url(${background})`
		}}>
		<Paper
		style={{
			minWidth: 400,
			width: "40%",
			margin: "auto",
			marginTop: 100,
			padding: 10,
			opacity: 0.9
        }}>
			<p>Details of {data.name} :</p>
			<li>Gender : {data.gender}</li> 
			<li>Birthday Year : {data.birth_year}</li> 
			<li>Height : {data.height}</li> 
			<li>Mass : {data.mass}</li> 
			<li>Hair Color : {data.hair_color}</li> 
			<li>Skin Color : {data.skin_color}</li> 
			<li>Eye Color : {data.eye_color}</li>
			<li>HomeWorld : {homeworld}</li>  
			{/* <li>Films :</li><ul>{arrayUrl}</ul> */}
			<li>Species : {data.species}</li> 
			<li>Vehicles : {data.vehicles}</li>
			<li>Starships : {data.starships}</li> 
			<li>Created : {data.created}</li> 
			<li>Edited : {data.edited}</li>  
			</Paper> 
		</div>
	)
  }
}