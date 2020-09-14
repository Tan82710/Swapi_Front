import React, { Component } from 'react';
import App from '../App'
import {NavLink } from "react-router-dom";
import Detail from './peopleDetail'
import {Grid} from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import fond from '../Img/fond.jpg'
import espace from '../Img/espace.jpg'
import '../App.css'

class People extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      apiResponse : [],
      inputValue: '',
    }
  }


  componentDidMount() {
    this.callAPI()
  }

callAPI() {

    fetch(`http://localhost:4200/people/`,  
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
  
  console.log(this.state.apiResponse)
  const data  = this.state.apiResponse.filter(
    (people) => {
      return people.name.indexOf(this.state.inputValue) !== -1
    }
  ) 
  console.log('DATA' + JSON.stringify(data))
  
  const listName = data.map((people) => {
    const myid = people.url.split("http://swapi.dev/api/people/")
    const x = myid[1]
    const id = x.substr(0, x.length-1)

    return (
    <Grid item xs = {6}>
      <NavLink to={"/detail?id=" + id}>
				<Card style={{
              minWidth: 200,
              textAlign : 'center',
              backgroundImage : `url(${fond})`,
              color : 'white'
        }}>
          <CardContent> 
            <Typography variant="h5" component="h2" key={people.url}>
              {people.name}
            </Typography>
            <Typography variant="body2" component="p">
             <li>Gender : {people.gender}</li>  
             <li>Height : {people.height}</li> 
             <li>Birthday : {people.birth_year}</li>
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
		</Grid>
    
    )
  })

  return (
    <div style = {{backgroundImage : `url(${espace})`}}>
      <h1 style={{color : 'white', textAlign : 'center'}}>API Star Wars</h1>
        <div style={{textAlign : 'center'}}>
          <p> <h2 style={{color: 'white'}}>Search by name : </h2>
          <input label="Search by name" class="textInput" type='text' value={this.state.inputValue} onChange={this.updateSearch.bind(this)}/></p>
        </div>
      <div>
        <Grid container spacing={6}> 
          {listName}
        </Grid>
      </div>  
    </div>
  );
  }
}

export default People;