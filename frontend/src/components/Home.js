import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is: null,
            data: ''
        }
        this.getIsAuth = this.getIsAuth.bind(this)
        this.getData = this.getData.bind(this)
    }
    getIsAuth(){
        fetch('/api/auth')
            .then(response => response.json())
            .then(data => this.setState({is: data}))
            .then(this.getData())
    }
    getData(){
        fetch('/api/user')
            .then(response => response.json())
            .then(info => this.setState({data: info}))
    }
    componentDidMount() {
        this.getIsAuth()
        // eslint-disable-next-line no-unused-expressions
    }
    renderNotAuthenticated(){
        return(
            <div>
                <Grid container alignItems="center" direction="column" justify="center">
                    <h1>You are not authenticated</h1>
                    <a className="link" href="/login/auth0">Login or Register Here</a>
                </Grid>
            </div>
        )

    }

    renderIsAuthenticated(){
        return(
            <div>
                <a href="/logout">Logout</a>
                <br />
                <h1>{this.state.data.name}</h1>
                <h2>{this.state.data.email}</h2>
                <br />
                <img src={this.state.data.picture} />
            </div>
        )
    }
    render() {
        return (
            <div>
                {!this.state.is ? this.renderNotAuthenticated() : (
                    this.renderIsAuthenticated()
                )}
            </div>
        )
    }
}