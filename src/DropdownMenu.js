import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class DropdownMenu extends React.Component {
    render() {
        return(<Dropdown text={this.props.placeholder} >
            <Dropdown.Menu>
                {this.props.usersArray.map((user) => {
                    return <Dropdown.Item key={user.id} text={user.username} onClick={() => this.props.onChange(user)} />
                })}
            </Dropdown.Menu>
        </Dropdown>)   
    }
}