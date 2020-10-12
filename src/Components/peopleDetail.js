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
			background : '', apiResponse : [], name : [],
			filmsResponse : [], filmsArray : [],
			vehiclesResponse : [], vehiclesArray : [],
			speciesResponse : [], speciesArray : [],
			starshipsResponse : [], starshipsArray: [],

		}
	}

	componentDidMount() {
		const url = window.location.href
		const splitId = url.split("http://localhost:3000/detail?id=")
		const id = splitId[1]
		this.state.id = id
		this.callAPI(id)
		this.callAPIFilms(id)
		this.callFilms()
		this.callVehicles()
		this.callSpecies()
		this.callStarships()
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
	callAPIFilms(id){
		fetch(`http://localhost:4200/detail/${id}`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({name : res.name, filmsArray: res.films, vehiclesArray: res.vehicles, speciesArray: res.species, starshipsArray: res.starships}))
		.catch(err => err)
	}

	//Récupération de tous les films pour affichage des titres
	callFilms(){
		fetch(`http://localhost:4200/films/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ filmsResponse: res.results}))
		.catch(err => err)
	}

	//Récupération des véhicules
	callVehicles(){
		fetch(`http://localhost:4200/vehicles/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ vehiclesResponse: res.results}))
		.catch(err => err)
	}

	//Récupération des espèces
	callSpecies(){
		fetch(`http://localhost:4200/species/`,  
		{headers: {
	  	'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ speciesResponse: res.results}))
		.catch(err => err)
	}

	//Récupération des vaisseaux
	callStarships(){
		fetch(`http://localhost:4200/starships/`,  
		{headers: {
		'Content-Type': 'application/json'
		}})
		.then(res => res.json())
		.then(res => this.setState({ starshipsResponse: res.results}))
		.catch(err => err)
	}


  render() {
	//ALLL DETAILS
	const data = this.state.apiResponse
	//FILMS
	const arrayFilm = this.state.filmsArray
	const dataFilms = this.state.filmsResponse
	//VEHICLES
	const dataVehicles = this.state.vehiclesResponse
	const arrayVehicle = this.state.vehiclesArray
	//SPECIES
	const dataSpecies = this.state.speciesResponse
	const arraySpecie = this.state.speciesArray
	//STARSHIPS
	const dataStarships = this.state.starshipsResponse
	const arrayStarship = this.state.starshipsArray


	const film = arrayFilm.map(res => {
		return res
	})

	const vehicle = arrayVehicle.map(res => {
		return res
	})
	
	const specie = arraySpecie.map(res => {
		return res
	})

	const starship = arrayStarship.map(res => {
		return res
	})

	//Tableau de tous les films
	const arrayFilms = dataFilms.map(film => {
		return [film.url, film.title]
	})
	//Tableau de tous les véhicules
	const arrayVehicles = dataVehicles.map(res => {
		return [res.url, res.name]
	})
	//Tableau de tous les espèces
	const arraySpecies = dataSpecies.map(res => {
		return [res.url, res.name]
	})
	//Tableau de tous les vaisseaux
	const arrayStarships = dataStarships.map(res => {
		return [res.url, res.name]
	})


// Comparaison des 2 tableaux vehicles
const vehicles = arrayVehicles.filter((res1) => {
	return vehicle.some((res2) => {
		return res1[0] === res2
	})
}).map((res) => {
	const url = res[0]
	const name = res[1]
	return <li key={url}>{name}</li>
})

//Comparaison des 2 tableaux films
const films = arrayFilms.filter((res1) => {
	return film.some((res2) => {
		return res1[0] === res2
	})
}).map((res) => {
	const url = res [0]
	const title = res[1]
	return <li key={url}>{title}</li>
})

// Comparaison des 2 tableaux d'espèces
const species = arraySpecies.filter((res1) => {
	return specie.some((res2) => {
		return res1[0] === res2
	})
}).map((res) => {
	const url = res [0]
	const speciesName = res[1]
	return <li key={url}>{speciesName}</li>
})

// Comparaison des 2 tableaux de vaisseaux
const starships = arrayStarships.filter((res1) => {
	return starship.some((res2) => {
		return res1[0] === res2
	})
}).map((res) => {
	const url = res [0]
	const starshipsName = res[1]
	return <li key={url}>{starshipsName}</li>
})


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
			<h1 style={{fontWeight : 'bold'}}>Details of {data.name}</h1>
			<tr>Gender : {data.gender}</tr> 
			<tr>Birthday Year : {data.birth_year}</tr> 
			<tr>Height : {data.height}</tr> 
			<tr>Mass : {data.mass}</tr> 
			<tr>Hair Color : {data.hair_color}</tr> 
			<tr>Skin Color : {data.skin_color}</tr> 
			<tr>Eye Color : {data.eye_color}</tr>
			<tr>HomeWorld : {homeworld}</tr>  
			<tr>Films : <ul>{films}</ul></tr>
			<tr>Species : <ul>{species}</ul></tr> 
			<tr>Vehicles : <ul>{vehicles}</ul></tr>
			<tr>Starships : <ul>{starships}</ul></tr> 
			<tr>Created : {data.created}</tr> 
			<tr>Edited : {data.edited}</tr>  
			</Paper> 
		</div>
	)
  }
}