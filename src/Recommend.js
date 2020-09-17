import React from 'react';
import { Segment } from 'semantic-ui-react'
import PodcastCard from './PodcastCard'

export default class Recommend extends React.Component {
    state={
        recPod: null
    }

    handleClick = () => {
      this.props.editFavs(this.state.recPod)
    }
    
    linkToWebsite = () => {
      window.open(this.state.recPod.website)
    }
    
    likeButtonFill = () => {
       if (this.props.user.username ) {
        
        let userFavPods = this.props.userFavs.map(favorite => favorite.podcast)
        let userFavPodIds = userFavPods.map(pod => pod.id)
        if (userFavPodIds.includes(this.state.recPod.id)) {
          return <i className="heart icon"></i>
        } else {
          return <i className="empty heart icon"></i>
        }} else {
          return <i className="empty heart icon"></i>
        }
    }
    
    makeGenreMap = () => {
        let userFavorites = this.props.userFavs
        let newGenreMap = {}

        for (let pod of userFavorites) {
            // console.log(pod.podcast.genre)
            if (newGenreMap[pod.podcast.genre]) {
                newGenreMap[pod.podcast.genre] +=1
            } else {
                newGenreMap[pod.podcast.genre] = 1
            }

        }
        return newGenreMap
    }

    recommendPod = () => {
        let genreMap = this.makeGenreMap()
        let mostTimesFaved = 0
        let mostCommonGenre = ""
        let sameGenrePods = []

        for (let genre in genreMap) {
            if (genreMap[genre] > mostTimesFaved) {
                mostTimesFaved = genreMap[genre]
                mostCommonGenre = genre
            }
        }

        // console.log(this.props.allPods)
        for (let pod of this.props.allPods) {
            // console.log(pod)
            if (pod.genre === mostCommonGenre) {
                sameGenrePods.push(pod)
            }
        }

        let recommendedPod = sameGenrePods[Math.floor(Math.random()*sameGenrePods.length)]
        if (recommendedPod && this.props.user) {
            this.renderPodCard(recommendedPod)
        }
    }

    renderPodCard = (pod) => {
        this.setState({
            recPod: pod
        })
        // console.log(pod)
        // return <PodcastCard podcast={pod}/>
    }

    render() {

        return(<div>
            {/* {this.makeGenreMap()} */}
            {/* {this.recommendPod()} */}
            <button onClick={() => this.recommendPod()}>Find me a new Podcast!</button>
            {this.state.recPod ? <PodcastCard podcast={this.state.recPod} user={this.props.user} favorites={this.props.userFavs}/> : null}
        </div>)
    }
}