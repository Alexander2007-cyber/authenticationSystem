import React, {Component} from 'react'
import Home from './components/Home'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/login">

                    </Route>
                </Switch>
            </Router>
            </div>
        )
    }
}