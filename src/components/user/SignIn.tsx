import React from 'react'
import imgfcb from '../../assets/fcb.png'
import imggmail from '../../assets/gmail.png'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Row, Form, Button, Col, Alert } from 'react-bootstrap'
import { history } from '../history'
import { login, loginFacbook, loginGmail } from './Userlogin'

interface State {
    email: string
    password: string
    test: string
    code: string
}

interface Props extends RouteComponentProps {}
class SignIn extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
        test: '',
        code: '',
    }

    render() {
        const search = this.props.location.search
        if (search.indexOf('code=') !== -1) {
            if (search.indexOf('scope=') !== -1) {
                loginGmail(search + '#')
            } else {
                const code = search.substring(6)
                loginFacbook({ code: code + this.props.location.hash })
            }
        }

        return (
            <Row className="SignIn">
                <Row id="SignInRow">
                    <Col sm={6} md={6} className="Colsignup2"></Col>
                    <Col className="Colsignup" sm={5} md={6}>
                        <Form
                            style={{
                                fontFamily: 'Old Standard TT',
                                fontWeight: 'bold',
                                justifyContent: 'center',
                            }}
                            onSubmit={this.handleSubmit}
                        >
                            <label className="label">Sign In</label>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                            <Row>
                                <Col sm={5} md={5}>
                                    <Button
                                        variant="info"
                                        type="submit"
                                        style={{ marginLeft: '43%' }}
                                        onClick={this.handleSubmit}
                                    >
                                        Sign In
                                    </Button>
                                </Col>
                                <Col sm={5} md={5}>
                                    <Link to="/Signup">
                                        <Button
                                            variant="info"
                                            type="submit"
                                            style={{ marginLeft: '43%' }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Col>
                                <Alert
                                    style={{
                                        color: 'red',
                                        textAlign: 'center',
                                    }}
                                >
                                    {this.state.test}
                                </Alert>
                            </Col>
                        </Form>

                        <Row className="mt-3">
                            <Col>
                                <hr
                                    style={{
                                        backgroundColor: 'black',
                                    }}
                                />
                            </Col>
                            <Col
                                style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Old Standard TT',
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    marginTop: '2%',
                                }}
                            >
                                Or
                            </Col>
                            <Col>
                                <hr
                                    style={{
                                        backgroundColor: 'black',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col sm={2} md={6}>
                                <Button
                                    className="btngmail"
                                    variant="info"
                                    onClick={this.authFacbook}
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img
                                        src={imgfcb}
                                        alt="gmail"
                                        width="100%"
                                        height="100%"
                                    />
                                </Button>
                            </Col>
                            <Col sm={2} md={6}>
                                <Button
                                    style={{
                                        width: '50%',
                                        marginLeft: '5%',
                                    }}
                                    className="btngmail"
                                    variant="info"
                                    onClick={this.authGmail}
                                >
                                    <img
                                        src={imggmail}
                                        alt="gmail"
                                        width="100%"
                                        height="100%"
                                    />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        )
    }

    ///Events
    componentDidMount() {
        const key = this.props.location.search.split('?code=')[1]
        this.setState({ code: key })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value } as Pick<State, any>)
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        const users = {
            email: this.state.email,
            password: this.state.password,
        }
        login(users).then(json => {
            if (json !== 'Password is Woring!' && json !== 'Email is Woring!') {
                sessionStorage.setItem('token', json)
                if (sessionStorage.getItem('pack')) {
                    //@ts-ignore
                    const quiz = JSON.parse(sessionStorage.getItem('pack'))
                    history.push('/content/' + quiz.product._id)
                } else history.push('/')
            } else {
                this.setState({ test: json })
            }
        })
    }

    authFacbook = async (event: any) => {
        event.preventDefault()
        await fetch('https://mylittledresslab.herokuapp.com/auth/pathFacebook')
            .then(res => res.json())
            .then(json => {
                window.location = json
                console.log(json)
            })
    }

    authGmail = async (event: any) => {
        event.preventDefault()
        await fetch('https://mylittledresslab.herokuapp.com/auth/pathGmail')
            .then(res => res.json())
            .then(json => {
                window.location = json
                console.log(json)
            })
    }
}
export default SignIn
