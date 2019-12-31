import React from 'react'
import PodcastCard from './PodcastCard'
// import { Card } from 'semantic-ui-react'


export default class PodcastContainer extends React.Component {
    render() {
        return (<div className="ui equal width grid" >
            {this.props.podcastArray.map(podcast => <PodcastCard key={podcast.id} podcast={podcast} editFavs={this.props.editFavs} user={this.props.user} />)}  
        </div>)
    }
}