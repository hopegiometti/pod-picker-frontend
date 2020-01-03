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
        if (this.props.nightmode) {
            return (<div className="ui checkbox">
                <input type="checkbox" name="nightmode" checked={this.props.nightmode} onChange={this.handleNightmodeChange}/>
                    <label className="ui white small label">Nightmode</label>
            </div>)
        } else {
            return (<div className="ui checkbox">
                <input type="checkbox" name="nightmode" checked={this.props.nightmode} onChange={this.handleNightmodeChange}/>
                <label>Nightmode</label>
            </div>)
        }  
    }

    renderNightmodeSettings = () => {
        if (this.props.user.username) {
            return(<div>
              <Form inverted onSubmit={this.handleSubmit}>
              <Form.Group width="six wide">
                  <Form.Input label="Change Username:" placeholder={this.props.user.username} name="username" value={this.state.username} onChange={this.onChange} />
              </Form.Group>
              <Form.Button>Submit</Form.Button>
              </Form>
              <br></br>
              {this.updatedNightmode()}
              <br></br>
              <div>
                <div className="ui inverted height stretched segment">
                  <button className="ui inverted right floated button" onClick={this.props.deleteUser}>
                    Delete Account
                  </button>
                  <br/>
                </div>
              </div>
                <div className="ui hieght stretched inverted segment">
                    <p></p>
                </div>
              </div>)
          } else {
               return (<div>
                  <Form inverted onSubmit={this.handleSubmit}>
                  <Form.Group width="six wide">
                      <Form.Input label="Change Username:" placeholder="Choose a username" name="username" value={this.state.username} onChange={this.onChange} />
                  </Form.Group>
                  <Form.Button>Submit</Form.Button>
                  </Form>
                  {/* {this.updatedNightmode()} */}
              </div>)
          }

    }

    renderRegularSettings = () => {
        if (this.props.user.username) {
          return(<div>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group width="six wide">
                <Form.Input label="Change Username:" placeholder={this.props.user.username} name="username" value={this.state.username} onChange={this.onChange} />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
            </Form>
            <div>
            {this.updatedNightmode()}
            <br></br>
              <div>
                <button className="ui right floated button" onClick={this.props.deleteUser}>
                Delete Account
                </button>
                <br/>
              </div>
            </div>
            </div>)
        } else {
             return(<div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group width="six wide">
                    <Form.Input label="Change Username:" placeholder="Choose a username" name="username" value={this.state.username} onChange={this.onChange} />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
                </Form>
                <div>
                {/* {this.updatedNightmode()} */}
                </div>
            </div>)
        }
    }
    

    render() {
        return(<div>
        {this.props.nightmode ? this.renderNightmodeSettings() : this.renderRegularSettings()}
    </div>)
    }
}

export default UserSettings