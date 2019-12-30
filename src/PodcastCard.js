import React from 'react'
import { Segment } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.editFavs(this.props.podcast)
    }

    seeMorePodInfo = () => {}

    render() {
      // console.log(this.props.podcast.podcast.title)
        return (<div onClick={this.seeMorePodInfo} >
        <div className="ui link cards">
           <div className="card">
             <div className="ui slide reveal">
              {/* <div className="visible content" > */}
                <img src={this.props.podcast.thumbnail} height={300} alt="" className="visible content"/> 
              {/* </div> */}
              <div className="hidden content" >
              <Segment style={{overflow: 'auto', maxHeight: 200 }}>{this.props.podcast.description}</Segment>
                <p>Genre: {this.props.podcast.genre} </p>
                <button className="ui icon button" >
                  <i className="external url icon" ></i>
                </button>
              </div>
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