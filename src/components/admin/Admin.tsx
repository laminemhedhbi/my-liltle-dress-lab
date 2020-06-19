import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import backgroundImage from '../../assets/lights-photography-white-lighting-53265.jpg'
import logo from '../../assets/MLDL_Logo_test_512px.png'
import { history } from '../history'

interface State {
    login: string
    password: string
    loading: boolean
    errorLogin: boolean
}
class Admin extends React.Component<{}, State> {
    state: State = {
        login: '',
        password: '',
        loading: false,
        errorLogin: false,
    }

    render() {
        if (sessionStorage.getItem('admin-token')) history.push('/admin/home')
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        let err = ''
        if (this.state.errorLogin) {
            err = 'Verified your login and password'
        }
        return (
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    height: '100vh',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Container style={{ paddingTop: '5%' }}>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            color: '#545457',
                        }}
                    >
                        <img alt="logo" src={logo} style={{ width: '20%' }} />
                        <h3>{err}</h3>
                    </div>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col xs={8} md={4}>
                            <Form className="form" onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Login </Form.Label>
                                    <Form.Control
                                        placeholder="login"
                                        name="login"
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="******"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>
                                <div style={{ textAlign: 'center' }}>
                                    <Button type="submit">Sign In</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value } as Pick<State, any>)
    }

    handleSubmit = (event: any) => {
        this.setState({
            loading: true,
        })
        event.preventDefault()

        const admin = {
            login: this.state.login,
            password: this.state.password,
        }
        axios
            .post('https://mylittledresslab.herokuapp.com/auth/admin', {
                login: admin.login,
                password: admin.password,
            })
            .then(
                res => {
                    this.setState({
                        loading: false,
                    })
                    if (
                        res.data !== 'Password is Woring!' &&
                        res.data !== 'Login is Woring!'
                    ) {
                        sessionStorage.setItem('admin-token', res.data)
                        history.push('/admin/home')
                    } else {
                        this.setState({
                            errorLogin: true,
                            password: '',
                        })
                    }
                },
                error => {
                    console.log(error)
                }
            )
    }
}
export default Admin
