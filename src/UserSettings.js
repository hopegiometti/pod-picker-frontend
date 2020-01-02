import React from 'react'
import { Form } from 'semantic-ui-react'

class UserSettings extends React.Component {
    state={
        username: ''
    }

    onChange = (evt) => {
        this.setState({
            username: evt.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        if (this.props.user.username) {
            this.props.updateUsername(this.state.username)
            this.setState({
                username: ''
            })
        } else {
            this.props.createUser(this.state.username)
            this.setState({
                username: ''
            })
        }
        
    }

    handleNightmodeChange = () => {
        if (this.props.nightmode === false) {
            this.props.changeNightmode(true)
        } else {
            this.props.changeNightmode(false)
        }
    }

    updatedNightmode = () => {
        return (<div class="ui checkbox">
            <input type="checkbox" name="nightmode" checked={this.props.nightmode} onChange={this.handleNightmodeChange}/>
            <label>Nightmode</label>
        </div>)
    }

    render() {
        return(<div>
        {this.props.user.username ? 
            <div>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group width="six wide">
                <Form.Input label="Change Username:" placeholder={this.props.user.username} name="username" value={this.state.username} onChange={this.onChange} />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
            </Form>
            {this.updatedNightmode()}
            </div> : 
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group width="six wide">
                    <Form.Input label="Change Username:" placeholder="Choose a username" name="username" value={this.state.username} onChange={this.onChange} />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
                </Form>
                {this.updatedNightmode()}
            </div>
            }
    </div>)
    }
}

export default UserSettings