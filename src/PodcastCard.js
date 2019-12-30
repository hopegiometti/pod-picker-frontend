import React from 'react'
import { Card } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.addToFavs(this.props.podcast)
    }

    render() {
        return (
            <div>
          <div className="image" >
            <img src={this.props.podcast.thumbnail} height={300} alt=""/> 
          </div>
          <div className="content">
            <div className="header">{this.props.podcast.title}</div>
          </div>
          <div className="extra content">
            <span>
              <button className="ui icon button" onClick={() => this.handleClick()}>
                <i className="heart icon"></i>
              </button>
            </span>
            </div>
        </div>)
    }
}