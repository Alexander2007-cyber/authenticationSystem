import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
        this.getUrl = this.getUrl.bind(this)
        this.getUrl()
    }
    getUrl(){
        fetch('/api/login')
            .then(response => response.json())
            .then(data => this.setState({url: data.path}))
    }

    render() {
        return (
            <div>
                <h1>Hi my name is Alexander Yordanov is the login component</h1>

                <a href={this.state.url}>Redirect</a>
            </div>
        )
    }
}