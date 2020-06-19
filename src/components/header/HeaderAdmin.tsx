import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import logo from '../../assets/MLDL_Logo_test_512px.png'
import { history } from '../history'

class Header extends Component {
    render() {
        return (
            <Container>
                <Navbar bg="" expand="sm">
                    <Navbar.Brand>
                        <img alt="logo" src={logo} className="imgLogo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/admin/home">Home</Nav.Link>
                            <Nav.Link href="/admin/dresses">Dresses</Nav.Link>
                            <Nav.Link href="/admin/accessories">
                                Accessories
                            </Nav.Link>
                            <Nav.Link href="/admin/typeaccessories">
                                Types Accessories
                            </Nav.Link>
                            <Nav.Link href="/admin/orders">Orders</Nav.Link>
                            <Nav.Link href="/admin/users">Users</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" onClick={this.onClick}>
                                Sign Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }

    onClick = () => {
        sessionStorage.clear()
        history.push('/')
    }
}
export default Header
