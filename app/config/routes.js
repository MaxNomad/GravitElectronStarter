import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../views/home';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'

const history = createBrowserHistory();

const Routes = (
    <Router history={history}>
        <div>
            <Route path="/" exact component={Home} />
        </div>
    </Router>
);

export default Routes;
