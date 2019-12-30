import React from 'react';
import './App.css';
import PodcastContainer from './PodcastContainer'
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import Menu from './Menu'
import DropdownMenu from './DropdownMenu'


class App extends React.Component {
  state={
    podcastArray: [],
    visible: false,
    usersArray: [],
    user: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/podcasts")
    .then(r => r.json())
    .then((podcasts) => {
      this.setState({
        podcastArray: podcasts
      })
    }) 
    
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
     this.setState({
       usersArray: users 
     }) 
    })
  }

  addToFavs = (podcast) => {
    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        podcast_id: podcast.id
      })
    })
    .then(r => r.json())
    .then((resp) => {
     console.log(resp) 
    })
  }

  showMenu = () => {

  }

  handleChange = (userToSet) => {
    console.log(userToSet)
    this.setState({
      user: userToSet
    })
  }

  render() {
    console.log(this.state.user)
    let { userObj } = this.state.user
    return (
      <div>
        <div>
          <Menu showMenu={this.showMenu} />
        </div>
        { this.state.user.username ?
          <h2>Welcome, {this.state.user.username}
            <button className="ui icon large button right floated"> 
              <i className="sign-out icon"></i> 
            </button> 
            <button className="ui icon large button right floated"> 
              <i className="user icon"></i> 
            </button>
            <button className="ui icon large button right floated"> 
              <i className="home icon"></i> 
            </button>
          </h2> : <h2>Choose a user</h2> }
        <div>
          <DropdownMenu usersArray={this.state.usersArray} placeholder="Select User" onChange={this.handleChange} value={userObj} />   
        </div>
        <div className="pusher">
          <PodcastContainer podcastArray={this.state.podcastArray} addToFavs={this.addToFavs} /> 
        </div> 
      </div>
    );
  } 
}

export default App
