import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import Header from './components/header/Header';
import LandingPage from './components/LandingPage';
import Dresses from './components/Dresses';
import Accessories from './components/Accessories';
import Admin from './components/authentification/Admin';
import { history } from './components/history';
import TypeAccessories from './components/TypeAccessories';
import Orders from './components/Orders';

export default class App extends Component {
    render() {
        const header = window.location.pathname == '/' ? null : <Header />;
        return (
            <Router history={history}>
                {header}
                <Switch>
                    <Route path="/" exact component={Admin} />
                    <Route path="/home" component={LandingPage} />
                    <Route path="/dresses" component={Dresses} />
                    <Route path="/accessories" component={Accessories} />
                    <Route
                        path="/typeaccessories"
                        component={TypeAccessories}
                    />
                    <Route path="/orders" component={Orders} />
                </Switch>
            </Router>
        );
    }
}
