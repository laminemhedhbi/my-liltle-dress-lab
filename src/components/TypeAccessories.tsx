import React, { Component } from 'react';
import axios from 'axios';
import img from '../card-rl.png';
import {
    Modal,
    Button,
    Container,
    Form,
    Row,
    Col,
    Card,
} from 'react-bootstrap';
interface State {
    showInsert: boolean;
    showUpdate: boolean;
    _id: string;
    name: string;
    Types: Array<any>;
}
export default class TypeAccessories extends Component<{}, State> {
    state: State = {
        showInsert: false,
        showUpdate: false,
        _id: '',
        name: '',
        Types: [],
    };
    render() {
        const { name, showInsert, showUpdate } = this.state;
        return (
            <Container>
                {/* Top Content */}
                <Row
                    style={{
                        fontFamily: 'old standart tt',
                        paddingTop: '20px',
                    }}
                >
                    <Col>TITLE</Col>
                    <Col style={{ textAlign: 'right' }}>
                        <Button onClick={this.handler}>Create Type </Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row className="mt-5">
                    {this.state.Types.map((type: any, index: number) => {
                        return (
                            <Col
                                key={index}
                                xs={4}
                                md={3}
                                style={{ textAlign: 'center' }}
                            >
                                <div className="border p-4">
                                    <p>{type.name}</p>
                                    <Button
                                        name={type._id}
                                        onClick={this.deleteTypes}
                                        variant="danger"
                                        className="mr-2"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        name={type._id}
                                        variant="success"
                                        onClick={this.handlerUpdate}
                                    >
                                        UpDate
                                    </Button>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                ​{/* Modal  Insert*/}
                <Modal show={showInsert}>
                    <Modal.Header>
                        <Modal.Title>Create a new type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.InsertSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder="Enter Name"
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.InsertSubmit}>Submit</Button>
                        <Button onClick={this.handler}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                ​{/* Modal  Update*/}
                <Modal show={showUpdate}>
                    <Modal.Header>
                        <Modal.Title>Update a dress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.UpdateSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder="Enter Name"
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.UpdateSubmit}>Submit</Button>
                        <Button onClick={this.handlerUpdate}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
    componentDidMount() {
        this.getData();
    }
    //event
    getData = () => {
        axios.get('http://mylitterdresslab.herokuapp.com/types').then(data => {
            this.setState({
                Types: data.data,
            });
        });
    };
    handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value } as Pick<State, any>);
    };
    handler = () => {
        this.setState(prev => {
            return { showInsert: !prev.showInsert };
        });
    };
    handlerUpdate = (event: any) => {
        if (this.state.showUpdate == false) {
            const _id = event.currentTarget.name;
            const types = this.state.Types.find(element => element._id == _id);
            console.log(types);
            const name = types.name;
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id,
                    name,
                };
            });
        } else {
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id: '',
                    name: '',
                };
            });
        }
    };
    InsertSubmit = (e: any) => {
        e.preventDefault();
        const { name } = this.state;
        const types: any = {
            name: name,
        };
        fetch('https://mylitterdresslab.herokuapp.com/types', {
            method: 'POST',
            body: JSON.stringify(types),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwYjRiZjQ4MTdjMjFmNzhmZmU0MTYiLCJpYXQiOjE1ODQ0NDQ4MTh9.Y51DqoQkX7UbWz1W2LPeCduIMEkMIlrnXpdicDCM0Fg',
            },
        })
            .then(response => {
                this.setState(prev => {
                    return {
                        name: '',
                        Types: [...prev.Types, { name }],
                        showInsert: false,
                    };
                });
                return response.json();
            })
            .then(json => console.log(json));
    };
    UpdateSubmit = (e: any) => {
        e.preventDefault();
        const { _id, name } = this.state;
        const types: any = {
            name: name,
        };
        fetch('https://mylitterdresslab.herokuapp.com/types/' + _id, {
            method: 'PUT',
            body: JSON.stringify(types),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwYjRiZjQ4MTdjMjFmNzhmZmU0MTYiLCJpYXQiOjE1ODQ0NDQ4MTh9.Y51DqoQkX7UbWz1W2LPeCduIMEkMIlrnXpdicDCM0Fg',
            },
        })
            .then(response => {
                this.getData();
                this.setState(prev => {
                    return {
                        _id: '',
                        name: '',
                        showUpdate: false,
                    };
                });
                return response.json();
            })
            .then(json => console.log(json));
    };
    deleteTypes = (event: any) => {
        const id = event.currentTarget.name;
        fetch('https://mylitterdresslab.herokuapp.com/types/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwYjRiZjQ4MTdjMjFmNzhmZmU0MTYiLCJpYXQiOjE1ODQ0NDQ4MTh9.Y51DqoQkX7UbWz1W2LPeCduIMEkMIlrnXpdicDCM0Fg',
            },
        })
            .then(response => response.json())
            .then(json => {
                this.getData();
                console.log(json);
            });
    };
}
