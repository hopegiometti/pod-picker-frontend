import React from 'react'
import { Segment } from 'semantic-ui-react'


export default class PodcastCard extends React.Component {
    handleClick = () => {
      this.props.editFavs(this.props.podcast)
    }

    linkToWebsite = () => {
      window.open(this.props.podcast.website)
    }

    likeButtonFill = () => {
       if (this.props.user.username ) {
        let userFavPods = this.props.user.favorites.map(favorite => favorite.podcast.id)
        if (userFavPods.includes(this.props.podcast.id)) {
          // console.log(userFavPods, userFavPods.includes(this.props.podcast.id))
          return <i className="heart icon"></i>
        } else {
          // console.log(userFavPods, userFavPods.includes(this.props.podcast.id))
          return <i className="empty heart icon"></i>
        }} else {
          return <i className="empty heart icon"></i>
        }
    }

    render() {
        
      // let userFavPods = this.props.user.favorites.map(favorite => favorite.podcast)
      // console.log(this.props.podcast)
      // console.log("i am rendering")
        return (<div >
        <div className="ui link cards">
           <div className="card">
              <div className="ui slide reveal">
                  <img src={this.props.podcast.thumbnail} height={300} alt="" className="visible content"/> 
                <div className="hidden content" >
                  {this.props.podcast.explicit_content ? <a className="ui red horizontal label">Explicit</a> : null}
                <Segment style={{overflow: 'auto', maxHeight: 200 }}>{this.props.podcast.description}</Segment>
                  <span>Genre: {this.props.podcast.genre} </span>
                  <button className="ui icon button" onClick={this.linkToWebsite}>
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
                  {this.likeButtonFill()}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>)
    }
}

{/* <i className="heart icon"></i> */}

