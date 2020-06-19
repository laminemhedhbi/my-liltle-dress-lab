import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Container>
                <Navbar bg="" expand="sm">
                    <Navbar.Brand href="">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/dresses">Dresses</Nav.Link>
                            <Nav.Link href="/accessories">Accessories</Nav.Link>
                            <Nav.Link href="/typeaccessories">
                                Types Accessories
                            </Nav.Link>
                            <Nav.Link href="/orders">Orders</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }
}
export default Header;
