import React from 'react'
import PodcastCard from './PodcastCard'



export default class PodcastContainer extends React.Component {

    render() {
        return (
        <div className="ui equal width grid" >
            {this.props.podcastArray.map(podcast => <PodcastCard key={podcast.id} podcast={podcast} editFavs={this.props.editFavs} user={this.props.user} favorites={this.props.favorites} nightmode={this.props.nightmode}/>)}
        </div>)
    }
}