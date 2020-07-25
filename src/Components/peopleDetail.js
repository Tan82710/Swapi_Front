import React, { Component } from 'react';

export default class Detail extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			apiResponse : [{name : '', height : '', mass : '', hair_color : '', skin_color : '', eye_color : '', birth_year : '', gender : '', homeworld : '', films : '', species : '', vehicles : '', starships : '', created : '', edited : '', url : ''}],
		}
	}

	componentDidMount() {
		const url = window.location.href
		let id = url.charAt(url.length-2)
		this.callAPI(id)
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
	  
  render() {
	const data = this.state.apiResponse

  	return(
		<div className="main">
			<p>Details of {data.name} :</p>
			<li>Gender : {data.gender}</li> 
			<li>Birthday Year : {data.birth_year}</li> 
			<li>Height : {data.height}</li> 
			<li>Mass : {data.mass}</li> 
			<li>Hair Color : {data.hair_color}</li> 
			<li>Skin Color : {data.skin_color}</li> 
			<li>Eye Color : {data.eye_color}</li>
			<li>HomeWorld : {data.homeworld}</li>  
			<li>Films : {data.films}</li> 
			<li>Species : {data.species}</li> 
			<li>Vehicles : {data.vehicles}</li>
			<li>Starships : {data.starships}</li> 
			<li>Created : {data.created}</li> 
			<li>Edited : {data.edited}</li>  
		</div>
	)
  }
}