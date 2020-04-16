import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home/HomeComponent'

class Main extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Redirect to="/home" />
                </Switch>
            </HashRouter>
        );
    }
}

export default Main; 