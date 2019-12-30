import React from 'react';
import './App.css';
import PodcastContainer from './PodcastContainer'
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import Menu from './Menu'


class App extends React.Component {
  state={
    podcastArray: [],
    visible: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/podcasts")
    .then(r => r.json())
    .then((podcasts) => {
      this.setState({
        podcastArray: podcasts
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
        user_id: 2,
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

  render() {
    return (
      <div>
        <div>
          <Menu showMenu={this.showMenu} />
        </div>
        <div className="pusher">
          <PodcastContainer podcastArray={this.state.podcastArray} addToFavs={this.addToFavs} /> 
        </div> 
      </div>
    );
  } 
}

export default App
