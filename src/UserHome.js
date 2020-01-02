import React from 'react'
import PodcastContainer from './PodcastContainer'

export default class UserHome extends React.Component {
    renderUserPage = () => {
        if (this.props.userObject.username) {
            let podcastArray = this.props.favorites.map(favorite => favorite.podcast)
            return( <div>
                <div>
                    <h3>Your Favorite Podcasts:</h3>
                    <PodcastContainer podcastArray={podcastArray} editFavs={this.props.editFavs} user={this.props.userObject} favorites={this.props.favorites} />
                </div>
            </div> )
        } else {
            return(
                null
            )
        }
    }

    render() {
        // let podcastArray = this.props.userObject.favorites.map(favorite => favorite.podcast)
        // return( <div>
        //     <h3>Your Favorite Podcasts:</h3>
        //     <PodcastContainer podcastArray={podcastArray} editFavs={this.props.editFavs} user={this.props.userObject} favorites={this.props.favorites} />
        // </div> )
        // return null
        return(<div>
            {this.renderUserPage()}
        </div>)
    }
}