/*
 * app.js - Bootstraps the React app using React Router.
 */

import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Index from './pages/index.js';

export default class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Index} />
            </Router>
        );
    }
}

