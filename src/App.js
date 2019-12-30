import React from 'react';
import './App.css';
import PodcastContainer from './PodcastContainer'
import { Route, Switch, Link } from 'react-router-dom'
import Menu from './Menu'
import DropdownMenu from './DropdownMenu'
import { BrowserRouter } from 'react-router-dom'
import UserHome from './UserHome'
import FilterPodcasts from './FilterPodcasts'


class App extends React.Component {
  state={
    podcastArray: [],
    visible: false,
    usersArray: [],
    user: {},
    favorites: [],
    filteredFavs: []
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

  editFavs = (podcast) => {
    if (this.state.filteredFavs.length > 0) {
      let favoritePodcasts = this.state.filteredFavs.map(favorite => favorite.podcast)
      let favPodcastToEdit = this.state.filteredFavs.filter(favorite => favorite.podcast.id === podcast.id)
      if (favoritePodcasts.includes(podcast)) {
        fetch(`http://localhost:3000/favorites/${favPodcastToEdit[0].id}`, {
          method: "DELETE"
        })
        .then(r => r.json())
        .then((resp) => {
          console.log(resp.data) 
            let updatedFavs = this.state.filteredFavs.filter(favorite => favorite.id !== resp.data.id)
            this.setState({
              filteredFavs: updatedFavs
            })
        })
      } else {
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
        .then((newFav) => {
        console.log(newFav)
            this.setState({
              filteredFavs: [...this.state.filteredFavs, newFav]
            })
        })
      }
    } else {
      let favoritePodcasts = this.state.favorites.map(favorite => favorite.podcast)
      let favPodcastToEdit = this.state.favorites.filter(favorite => favorite.podcast.id === podcast.id)
      if (favoritePodcasts.includes(podcast)) {
        fetch(`http://localhost:3000/favorites/${favPodcastToEdit[0].id}`, {
          method: "DELETE"
        })
        .then(r => r.json())
        .then((resp) => {
          console.log(resp.data) 
            let updatedFavs = this.state.favorites.filter(favorite => favorite.id !== resp.data.id)
            this.setState({
              filteredFavs: updatedFavs
            })
        })
      } else {
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
        .then((newFav) => {
        console.log(newFav)
            this.setState({
              filteredFavs: [...this.state.favorites, newFav]
            })
        })
      }
    }
  }

  showMenu = () => {

  }

  handleUserChange = (userToSet) => {
    console.log(userToSet)
    this.setState({
      user: userToSet,
      favorites: userToSet.favorites
    })
  }

  handleGenreChange = (pickedGenre) => {
    console.log(pickedGenre)
    // this.setState({
    //   user: userToSet,
    //   favorites: userToSet.favorites
    // })
  }

  renderUserHomePage = () => {
        if (this.state.filteredFavs.length > 0 ) {
          return <UserHome userObject={this.state.user} favorites={this.state.filteredFavs} editFavs={this.editFavs}/>}
        else {
        return <UserHome userObject={this.state.user} favorites={this.state.favorites} editFavs={this.editFavs}/>}
  }

  render() {
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
          <DropdownMenu usersArray={this.state.usersArray} placeholder="Select User" onChange={this.handleUserChange} value={userObj} />   
        </div>
        
        <Switch>
          <Route path="/browse" render={ () => {
            return <div className="ui four column doubling stackable grid container">
              <h3>Browse All Podcasts:</h3>
              <FilterPodcasts placeholder="Select genre" podcastArray={this.state.podcastArray} onChange={this.handleGenreChange}/>
              <PodcastContainer podcastArray={this.state.podcastArray} editFavs={this.editFavs} /> 
            </div> }} />
          <Route path="/user" render={this.renderUserHomePage} />
        </Switch> 
        
      </div>
    </BrowserRouter>
    );
  } 
}

export default App
