import React from 'react'
import PodcastContainer from './PodcastContainer'

export default class UserHome extends React.Component {
    // state={
    //     podcastArray: this.props.userObject.favorites
    // }



    render() {
        let podcastArray = this.props.userObject.favorites.map(favorite => favorite.podcast)
        return( <div>
            <h3>Your Favorite Podcasts:</h3>
            <PodcastContainer podcastArray={podcastArray} addToFavs={this.props.addToFavs} />
        </div> )
    }
}