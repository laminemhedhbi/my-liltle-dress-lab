import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { history } from '../history'

class Header extends Component {
    render() {
        let test: string = ''
        if (sessionStorage.getItem('token')) test = 'Sign Out'
        else test = 'Sign In'

        return (
            <div style={{ position: 'absolute', width: '100%', zIndex: 100 }}>
                <Container>
                    <Navbar
                        expand="sm"
                        style={{ opacity: '1' }}
                        collapseOnSelect
                    >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link
                                    href="/"
                                    style={{
                                        backgroundColor: '#d2ccc8',
                                        borderRadius: '8px',
                                        padding: '7px 17px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Old Standard TT',
                                    }}
                                >
                                    Back Home
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link
                                    href="#"
                                    onClick={this.onClick}
                                    style={{
                                        backgroundColor: '#d2ccc8',
                                        borderRadius: '8px',
                                        padding: '7px 17px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Old Standard TT',
                                    }}
                                >
                                    {test}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
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
