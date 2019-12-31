import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class FilterPodcasts extends React.Component {
    render() {
        let podcastGenres = this.props.podcastArray.map(podcast => podcast.genre)
        // list = list.filter((x, i, a) => a.indexOf(x) == i)
        let uniqueGenres = podcastGenres.filter((x, i, a) => a.indexOf(x) === i)
        // console.log(podcastGenres)
        return( <Dropdown text={this.props.placeholder} >
            <Dropdown.Menu>
                <Dropdown.Item text="All" onClick={() => this.props.onChange("All")}/>
                {uniqueGenres.map((genre) => {
                    return <Dropdown.Item text={genre} onClick={() => this.props.onChange(genre)} />
                })}
            </Dropdown.Menu>
        </Dropdown> )
    }
}