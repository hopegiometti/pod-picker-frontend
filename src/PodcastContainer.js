import React from 'react'
import PodcastCard from './PodcastCard'
import { Card } from 'semantic-ui-react'


export default class PodcastContainer extends React.Component {
    render() {
        return (<div>

            <Card.Group itemsPerRow={3}>
                {this.props.podcastArray.map(podcast => <PodcastCard key={podcast.id} podcast={podcast} addToFavs={this.props.addToFavs} />)}
            </Card.Group>   
        </div>)
    }
}