import React from 'react';
import './App.css';
import PodcastContainer from './PodcastContainer'
import { Route, Switch, Link } from 'react-router-dom'
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
    filteredFavs: [],
    filteredPods: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch("http://localhost:3000/podcasts")
    .then(r => r.json())
    .then((podcasts) => {
      let abcPods = podcasts.sort((a, b) => a.title.localeCompare(b.title))
      this.setState({
        podcastArray: abcPods
      })
    }) 
    
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
     this.setState({
       usersArray: users
     }) 
    })

    fetch("http://localhost:3000/favorites")
    .then(r => r.json())
    .then((favs) => {
     this.setState({
       favorites: favs
     }) 
    })
    
    
  }

  editFavs = (podcast) => {
    if (this.state.filteredFavs.length > 0) {
      let podToEdit = this.state.filteredFavs.filter(fav => fav.podcast.id === podcast.id)
      let justThePods = this.state.filteredFavs.map(fav => fav.podcast)
      console.log(podToEdit, justThePods, this.state.filteredFavs)
      if (justThePods.includes(podcast)) {
        fetch(`http://localhost:3000/favorites/${podToEdit[0].id}`, {
          method: "DELETE"
        })
        .then(r => r.json())
        .then((resp) => {
          console.log(resp)
          // let userFavs = this.state.favorites.filter(fav => fav.user.id === this.state.user.id)
          let updatedFavs = this.state.filteredFavs.filter(fav => fav.podcast.id !== podcast.id)
          this.setState({
            filteredFavs: updatedFavs
          })
        })
      } else {
        fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: {
            "content-type": 'application/json',
            "accepts": 'application/json'
          },
          body: JSON.stringify({
            user_id: this.state.user.id,
            podcast_id: podcast.id
          })
        })
        .then(r => r.json())
        .then((newFav) => {
          console.log(newFav)
          // let userFavs = this.state.favorites.filter(fav => fav.user.id === this.state.user.id)
          this.setState({
            filteredFavs: [...this.state.filteredFavs, newFav]
          })
        })
      }
    } else {
      let userFavPods = this.state.favorites.filter(fav => fav.user.id === this.state.user.id)
      let podToEdit = userFavPods.filter(fav => fav.podcast.id === podcast.id)
      let justThePods = userFavPods.map(fav => fav.podcast)
      if (justThePods.includes(podcast)) {
        fetch(`http://localhost:3000/favorites/${podToEdit[0].id}`, {
          method: "DELETE"
        })
        .then(r => r.json())
        .then((resp) => {
          console.log(resp)
          let userFavs = this.state.favorites.filter(fav => fav.user.id === this.state.user.id)
          let updatedFavs = userFavs.filter(fav => fav.podcast.id !== podcast.id)
          this.setState({
            filteredFavs: updatedFavs
          })
        })
      } else {
        fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: {
            "content-type": 'application/json',
            "accepts": 'application/json'
          },
          body: JSON.stringify({
            user_id: this.state.user.id,
            podcast_id: podcast.id
          })
        })
        .then(r => r.json())
        .then((newFav) => {
          console.log(newFav)
          let userFavs = this.state.favorites.filter(fav => fav.user.id === this.state.user.id)
          this.setState({
            filteredFavs: [...userFavs, newFav]
          })
        })
      }
    }
  }

  handleUserChange = (userToSet) => {
    console.log(userToSet)
    this.setState({
      user: userToSet,
      favorites: userToSet.favorites
    })
  }

  handleGenreChange = (pickedGenre) => {
    if (pickedGenre === "All") {
      let newPodArray = this.state.podcastArray
      this.setState({
        filteredPods: newPodArray
      })
    } else {
      let newPodArray = this.state.podcastArray.filter(podcast => podcast.genre === pickedGenre)
      this.setState({
      filteredPods: newPodArray
    })}
    
  }

  renderUserHomePage = () => {
      if (this.state.filteredFavs.length > 0 ) {
        if (this.state.filteredFavs[0].user.id === this.state.user.id) {
          return <UserHome userObject={this.state.user} favorites={this.state.filteredFavs} editFavs={this.editFavs}/>
        } else {
          return <UserHome userObject={this.state.user} favorites={this.state.favorites.filter(fav => fav.user.id === this.state.user.id)} editFavs={this.editFavs}/>
        }
      } else {
        return <UserHome userObject={this.state.user} favorites={this.state.favorites.filter(fav => fav.user.id === this.state.user.id)} editFavs={this.editFavs}/>
    }
  }

  renderBrowsingPage = () => {
    if (this.state.filteredPods.length > 0) {
      if (this.state.filteredFavs.length > 0) {
        return <PodcastContainer podcastArray={this.state.filteredPods} editFavs={this.editFavs} user={this.state.user} favorites={this.state.filteredFavs} />
      } else {
        return <PodcastContainer podcastArray={this.state.filteredPods} editFavs={this.editFavs} user={this.state.user} favorites={this.state.favorites.filter(fav => fav.user.id === this.state.user.id)} />
      }
    } else {
      if (this.state.filteredFavs.length > 0) {
        return <PodcastContainer podcastArray={this.state.podcastArray} editFavs={this.editFavs} user={this.state.user} favorites={this.state.filteredFavs} />
      }
      return <PodcastContainer podcastArray={this.state.podcastArray} editFavs={this.editFavs} user={this.state.user} favorites={this.state.favorites.filter(fav => fav.user.id === this.state.user.id)} />
    }
  }

  handleLogout = () => {
    this.setState({
      user: {}
    })
  }

  render() {
    console.log("i am rendering")
    let { userObj } = this.state.user
    return (<BrowserRouter>
      <div>
        { this.state.user.username ?

          <div className="ui menu">
          
            <div className="header item">
              Welcome, {this.state.user.username}
            </div>
            <Link to="/user">
              <a className="item">
                User
              </a>
            </Link>
            <Link to="/browse">
              <a className="item">
                Browse
              </a>
            </Link>
            <div className="right menu">
              <Link to="/browse">
                <a className="item" onClick={this.handleLogout} >
                  Logout
                </a>
              </Link>
            </div>
          </div> : <h2>Choose a user</h2> }
          
        <div>
          <DropdownMenu usersArray={this.state.usersArray} placeholder="Select User" onChange={this.handleUserChange} value={userObj} />   
        </div>
        
        <Switch>
          <Route exact path="/browse" render={ () => {
            return <div className="ui four column doubling stackable grid container">
              <h3>Browse All Podcasts:</h3>
              <FilterPodcasts placeholder="Select genre" podcastArray={this.state.podcastArray} onChange={this.handleGenreChange}/>
              {this.renderBrowsingPage()}
            </div> }} />
          <Route exact path="/user" render={this.renderUserHomePage} />
        </Switch> 
        
      </div>
    </BrowserRouter>
    );
  } 
}

export default App
