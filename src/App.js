import React from 'react';
import './App.css';
import PodcastContainer from './PodcastContainer'
import { Route, Switch, Link } from 'react-router-dom'
import Menu from './Menu'
import DropdownMenu from './DropdownMenu'
import { BrowserRouter } from 'react-router-dom'
import UserHome from './UserHome'


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

  renderUserHomePage = (renderParams) => {
    console.log(renderParams)
    // const slug = renderParams.match.params.slug
    const user = this.state.user
    console.log(user)
    if (user)
      if (user.username === this.state.user.username)
        return <UserHome userObject={this.state.user} addToFavs={this.addToFavs}/>
      else return <h4>Change User</h4>
    else return null
  }

  render() {
    console.log(this.state.podcastArray)
    let { userObj } = this.state.user
    return (<BrowserRouter>
      <div>
        <div>
          <Menu showMenu={this.showMenu} />
        </div>
        { this.state.user.username ?
          <h2>Welcome, {this.state.user.username}
            <button className="ui icon large button right floated"> 
              <i className="sign-out icon"></i> 
            </button> 

            <Link to="/browse">
              <button className="ui icon large button right floated"> 
                <i className="home icon"></i> 
              </button>
            </Link>
            
            <Link to="/user">
              <button className="ui icon large button right floated" > 
                <i className="user icon"></i> 
              </button>
            </Link>

          </h2> : <h2>Choose a user</h2> }
        <div>
          <DropdownMenu usersArray={this.state.usersArray} placeholder="Select User" onChange={this.handleChange} value={userObj} />   
        </div>
        
          <Switch>
            <Route path="/browse" render={ () => {
             return <div className="ui four column doubling stackable grid container">
               <h3>Browse All Podcasts:</h3>
                <PodcastContainer podcastArray={this.state.podcastArray} addToFavs={this.addToFavs} /> 
              </div> }} />
            <Route path="/user" render={this.renderUserHomePage} />
          </Switch>
        
      </div>
      </BrowserRouter>
    );
  } 
}

export default App
