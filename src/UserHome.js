import React from 'react'
import PodcastContainer from './PodcastContainer'

export default class UserHome extends React.Component {
    render() {
        let podcastArray = this.props.favorites.map(favorite => favorite.podcast)
        console.log(podcastArray)
        return( <div>
            <h3>Your Favorite Podcasts:</h3>
            <PodcastContainer podcastArray={podcastArray} editFavs={this.props.editFavs} />
        </div> )
    }
}