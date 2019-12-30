import React from 'react'
import { Card } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.addToFavs(this.props.podcast)
    }

    render() {
        return (<Card>
            <div>
          <div className="image" >
            <img src={this.props.podcast.thumbnail} height={300} alt=""/> 
          </div>
          <div className="content">
            <div className="header">{this.props.podcast.title}</div>
          </div>
          <div className="extra content">
            <span onClick={() => this.handleClick()} role="img" aria-label="purple heart">
              💜 
            </span>
          </div>
        </div>
    </Card>)
    }
}