import React, { Component } from 'react';
import App from '../App'
import {NavLink } from "react-router-dom";
import Detail from './peopleDetail'

class People extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      apiResponse : [{name : '', height : '', mass : '', hair_color : '', skin_color : '', eye_color : '', birth_year : '', gender : '', homeworld : '', films : '', species : '', vehicles : '', starships : '', created : '', edited : '', url : ''}],
      inputValue: ''
    }
  }

  componentDidMount() {
    this.callAPI()
  }

callAPI() {
    fetch('http://localhost:4200/people',  
    {headers: {
      'Content-Type': 'application/json'
    }})
    .then(res => res.json())
    .then(res => this.setState({ apiResponse: res.results}))
    .catch(err => err)
}

updateSearch(event){
  this.setState({inputValue: event.target.value.substr(0,20)})
}

render(){ 

  const data  = this.state.apiResponse.filter(
    (people) => {
      return people.name.indexOf(this.state.inputValue) !== -1
    }
  )
  const listName = data.map((people) => {
    return (
    <li key={people.url}><NavLink to={"/detail?url=" + people.url}>{people.name}</NavLink></li>
    )
  })

  return (
    <div className='PeopleList'>
      <label>Search by name : </label>
      <input type='text' value={this.state.inputValue} onChange={this.updateSearch.bind(this)}/>
      <div>
        <nav>
          <ul>
            {listName}
          </ul>
          </nav>
      </div>
    </div>
  );
  }
}

export default People;