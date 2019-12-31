import React from 'react'
import { Segment } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.editFavs(this.props.podcast)
    }

    linkToWebsite = () => {
      window.open(this.props.podcast.website)
    }

    render() {
      // console.log(this.props.podcast.podcast.title)
        return (<div >
        <div className="ui link cards">
           <div className="card">
            {/* <div class="ui raised segment"> */}
              <div className="ui slide reveal">
                  <img src={this.props.podcast.thumbnail} height={300} alt="" className="visible content"/> 
                <div className="hidden content" >
                  {this.props.podcast.explicit_content ? <a className="ui red horizontal label">Explicit</a> : null}
                <Segment style={{overflow: 'auto', maxHeight: 200 }}>{this.props.podcast.description}</Segment>
                  <p>Genre: {this.props.podcast.genre} </p>
                  <button className="ui icon button" onClick={this.linkToWebsite}>
                    <i className="external url icon" ></i>
                  </button>
                </div>
              </div>
            {/* </div> */}
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