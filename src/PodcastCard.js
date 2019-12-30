import React from 'react'
import { Card } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.addToFavs(this.props.podcast)
    }

    render() {
      // console.log(this.props.podcast.podcast.title)
        return (<div>
        <div className="ui link cards">
           <div className="card">
            <div className="image" >
              <img src={this.props.podcast.thumbnail} alt=""/> 
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
          </div>
        </div>
      </div>)
    }
}