import React, { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import HeaderAdmin from './components/header/HeaderAdmin'
import Header from './components/header/Header'
import HeaderDressing from './components/header/HeaderDressing'

import LandingPage from './components/admin/LandingPage'
import Dresses from './components/admin/Dresses'
import DetailsDress from './components/admin/DetailsDress'
import Accessories from './components/admin/Accessories'
import DetailsAccessory from './components/admin/DetailsAccessory'
import Admin from './components/admin/Admin'
import { history } from './components/history'
import TypeAccessories from './components/admin/TypeAccessories'
import Orders from './components/admin/Orders'
import Users from './components/admin/Users'

import Content from './components/user/Content'
import SignIn from './components/user/SignIn'
import Home from './components/user/Home'
import AboutUs from './components/user/AboutUs'
import Contact from './components/user/Contact'
import SignUp from './components/user/SignUp'
import Pack from './components/user/Pack'

import './App.css'

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/admin" exact />
                    <Route path="/admin" component={HeaderAdmin} />
                    <Route path="/content" component={HeaderDressing} />
                    <Route component={Header} />
                </Switch>
                <Switch>
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/admin/home" component={LandingPage} />
                    <Route path="/admin/dresses" component={Dresses} />
                    <Route path="/admin/dress/:id" component={DetailsDress} />
                    <Route path="/admin/accessories" component={Accessories} />
                    <Route
                        path="/admin/accessory/:id"
                        component={DetailsAccessory}
                    />
                    <Route
                        path="/admin/typeaccessories"
                        component={TypeAccessories}
                    />
                    <Route path="/admin/orders" component={Orders} />
                    <Route path="/admin/users" component={Users} />

                    <Route path="/SignIn" exact component={SignIn} />
                    <Route path="/Signup" exact component={SignUp} />
                    <Route path="/content/:id" component={Content} />
                    <Route path="/" exact component={Home} />
                    <Route path="/aboutUs" component={AboutUs} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/Pack" component={Pack} />
                </Switch>
            </Router>
        )
    }
}
