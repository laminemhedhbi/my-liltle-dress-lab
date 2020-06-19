import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import logo from '../../assets/MLDL_Logo_test_512px.png'
import { history } from '../history'

class Header extends Component {
    render() {
        let test: string = ''
        if (sessionStorage.getItem('token')) test = 'Sign Out'
        else test = 'Sign In'

        return (
            <Container>
                <Navbar expand="sm" style={{ opacity: '1' }} collapseOnSelect>
                    <Navbar.Brand>
                        <img src={logo} alt="logo" className="imgLogo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/aboutus">About Us</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            <Nav.Link href="/howItWorks">How It Works</Nav.Link>
                            <Nav.Link href="/Pack">Pack</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" onClick={this.onClick}>
                                {test}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }

    onClick = () => {
        if (!sessionStorage.getItem('token')) {
            history.push('/SignIn')
        } else {
            sessionStorage.clear()
            history.push('/')
        }
    }
}
export default Header
