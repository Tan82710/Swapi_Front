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
			vehiclesResponse : [],
			vehiclesArray : [],
			background : '',

		}
	}

	componentDidMount() {
		const url = window.location.href
		const splitId = url.split("http://localhost:3000/detail?id=")
		const id = splitId[1]
		this.state.id = id
		this.callAPI(id)
		this.callFilms(id)
		this.callAPIFilms()
		this.callVehicles()
	  }

	//Récupération des détails des personnages
	callAPI(id) {
		fetch(`http://localhost:4200/detail/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ apiResponse: res}))
		.catch(err => err)
		
	}

	//Récupération des films du détail
	callFilms(id){
		fetch(`http://localhost:4200/detail/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ filmsArray: res.films, vehiclesArray: res.vehicles}))
		.catch(err => err)
	}

	//Récupération de tous les films pour affichage des titres
	callAPIFilms(){
		fetch(`http://localhost:4200/films/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ filmsResponse: res.results}))
		.catch(err => err)
	}

	callVehicles(){
		fetch(`http://localhost:4200/vehicles/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ vehiclesResponse: res.results}))
		.catch(err => err)
	}


  render() {

	const data = this.state.apiResponse
	const arrayFilm = this.state.filmsArray
	const dataFilms = this.state.filmsResponse
	const dataVehicles = this.state.vehiclesResponse
	const arrayVehicle = this.state.vehiclesArray

	const listfilms = dataFilms.map((film) => {
		return [film.url, film.title]
	})

	const film = arrayFilm.map(res => {
		return res
	})

	const arrayVehicles = dataVehicles.map((res) => {
		return [res.url, res.name]
	})

	const vehicle = arrayVehicle.map((res) => {
		return res
	})

	console.log(film)
	console.log(listfilms)
	console.log(arrayVehicles)
	console.log(vehicle)
	

// Comparaison des 2 tableaux vehicles
const vehicles = arrayVehicles.filter((res1) => {
	return vehicle.some((res2) => {
		console.log(res2)
		return res1[0] === res2
	})
}).map((res) => {
	const url = res[0]
	const name = res[1]
	return <li key={url}>{name}</li>
})
console.log(vehicles)

//Comparaison des 2 tableaux films
const films = listfilms.filter((res1) => {
	return film.some((res2) => {
		return res1[0] === res2
	})
}).map((res) => {
	const url = res [0]
	const title = res[1]
	return <li key={url}>{title}</li>
})
console.log(films)


//Changement de background selon la planète
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
			<tr>Gender : {data.gender}</tr> 
			<tr>Birthday Year : {data.birth_year}</tr> 
			<tr>Height : {data.height}</tr> 
			<tr>Mass : {data.mass}</tr> 
			<tr>Hair Color : {data.hair_color}</tr> 
			<tr>Skin Color : {data.skin_color}</tr> 
			<tr>Eye Color : {data.eye_color}</tr>
			<tr>HomeWorld : {homeworld}</tr>  
			<tr>Films : <ul>{films}</ul></tr>
			<tr>Species : {data.species}</tr> 
			<tr>Vehicles : <ul>{vehicles}</ul></tr>
			<tr>Starships : {data.starships}</tr> 
			<tr>Created : {data.created}</tr> 
			<tr>Edited : {data.edited}</tr>  
			</Paper> 
		</div>
	)
  }
}