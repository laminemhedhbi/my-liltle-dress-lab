import React from 'react';
import { login } from './AdminLogin';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { history } from '../history';
interface State {
    login: string;
    password: string;
}
class Admin extends React.Component<{}, State> {
    state: State = {
        login: '',
        password: '',
    };

    handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value } as Pick<State, any>);
    };
    handleSubmit = (event: any) => {
        event.preventDefault();

        const user = {
            login: this.state.login,
            password: this.state.password,
        };
        login(user).then(res => {
            if (res) {
                history.push('/home');
            }
        });
    };

    render() {
        return (
            <Container style={{ paddingTop: '15%' }}>
                <Row>
                    <Col></Col>

                    <Col>
                        <Form className="form" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>login </Form.Label>
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
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    entrer
                                </button>
                            </div>
                        </Form>
                    </Col>

                    <Col></Col>
                </Row>
            </Container>
        );
    }
}
export default Admin;
