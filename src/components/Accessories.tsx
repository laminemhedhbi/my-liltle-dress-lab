import React, { Component } from 'react';
import axios from 'axios';
import img from '../assets/robe.jpeg';
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
    price: string;
    type: string;
    imageUrl: string;
    accessories: Array<any>;
    types: Array<any>;
}
export default class Accessories extends Component<{}, State> {
    state: State = {
        showInsert: false,
        showUpdate: false,
        _id: '',
        name: '',
        price: '',
        type: '',
        imageUrl: '',
        accessories: [],
        types: [],
    };
    render() {
        const { showInsert, showUpdate, name, price } = this.state;
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
                        <Button onClick={this.handler}>Create Accessory</Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row style={{ paddingTop: '20px' }}>
                    {this.state.accessories.map(
                        (accesory: any, index: number) => {
                            return (
                                <Col key={index} xs={6} md={4}>
                                    <Card>
                                        <Card.Title></Card.Title>
                                        <Card.Img
                                            variant="top"
                                            src={img}
                                            style={{
                                                width: '100%',
                                                height: '250px',
                                            }}
                                        />
                                        <Card.Body></Card.Body>
                                        <Card.Footer
                                            style={{ textAlign: 'center' }}
                                        >
                                            Name: {accesory.name}
                                            <br />
                                            Type: {accesory.type.name}
                                            <br />
                                            Price: {accesory.price}
                                            <br />
                                            <Row>
                                                <Col
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        variant="danger"
                                                        name={accesory._id}
                                                        onClick={
                                                            this.deleteDress
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="success"
                                                        name={accesory._id}
                                                        onClick={
                                                            this.handlerUpdate
                                                        }
                                                    >
                                                        UpDate
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        },
                    )}
                </Row>
                ​{/* Modal  Insert*/}
                <Modal show={showInsert}>
                    <Modal.Header>
                        <Modal.Title>Create a new accesory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
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
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    onChange={this.handleChange}
                                >
                                    <option></option>
                                    {this.state.types.map(
                                        (types: any, index: number) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={types._id}
                                                >
                                                    {types.name}
                                                </option>
                                            );
                                        },
                                    )}
                                </Form.Control>
                            </Form.Group>
                            ​
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    value={price}
                                    onChange={this.handleChange}
                                    placeholder="Enter Price"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                ​
                                <Form.Control
                                    type="file"
                                    name="imageUrl"
                                    onChange={this.handleChange}
                                    accept="image.png"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button name="Insert" onClick={this.InsertSubmit}>
                            Submit
                        </Button>
                        <Button onClick={this.handler}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                ​{/* Modal  Update*/}
                <Modal show={showUpdate}>
                    <Modal.Header>
                        <Modal.Title>Update a dress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
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
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    value={price}
                                    onChange={this.handleChange}
                                    placeholder="Enter Price"
                                />
                            </Form.Group>
                            ​
                            <Form.Group>
                                <Form.Label>type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    onChange={this.handleChange}
                                >
                                    <option></option>
                                    {this.state.types.map(
                                        (types: any, index: number) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={types._id}
                                                >
                                                    {types.name}
                                                </option>
                                            );
                                        },
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                ​
                                <Form.Control
                                    type="file"
                                    name="imageUrl"
                                    onChange={this.handleChange}
                                    accept="image.png"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button name="Update" onClick={this.UpdateSubmit}>
                            Submit
                        </Button>
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
        axios
            .get('http://mylitterdresslab.herokuapp.com/accessory')
            .then(data => {
                console.log(data);
                this.setState({
                    accessories: data.data,
                });
            });
        axios.get('http://mylitterdresslab.herokuapp.com/types').then(data => {
            this.setState({
                types: data.data,
            });
        });
    };
    handleChange = (event: any) => {
        const name = event.target.name;
        const value =
            event.target.type == 'file'
                ? event.target.files[0].name
                : event.target.value;
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
            const accesory = this.state.accessories.find(
                element => element._id == _id,
            );
            const { name, type, price, imageUrl } = accesory;
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id,
                    name,
                    type,
                    price,
                    imageUrl,
                };
            });
        } else {
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id: '',
                    name: '',
                    type: '',
                    price: '',
                    imageUrl: '',
                };
            });
        }
    };
    InsertSubmit = (e: any) => {
        e.preventDefault();
        const { name, type, price, imageUrl } = this.state;
        const robe: any = {
            name: name,
            type: type,
            price: price,
            picture: imageUrl,
        };
        fetch('https://mylitterdresslab.herokuapp.com/accessory', {
            method: 'POST',
            body: JSON.stringify(robe),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwYjRiZjQ4MTdjMjFmNzhmZmU0MTYiLCJpYXQiOjE1ODQ0NDQ4MTh9.Y51DqoQkX7UbWz1W2LPeCduIMEkMIlrnXpdicDCM0Fg',
            },
        })
            .then(async response => {
                this.getData();
                this.setState(prev => {
                    return {
                        name: '',
                        price: '',
                        type: '',
                        imageUrl: '',
                        showInsert: false,
                    };
                });
                return response.json();
            })
            .then(json => console.log(json));
    };
    UpdateSubmit = (e: any) => {
        e.preventDefault();
        const { _id, name, type, price, imageUrl } = this.state;
        const robe: any = {
            name: name,
            type: type,
            price: price,
        };
        if (imageUrl != '') robe.picture = imageUrl;
        fetch('https://mylitterdresslab.herokuapp.com/accessory/' + _id, {
            method: 'PUT',
            body: JSON.stringify(robe),
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
                        price: '',
                        type: '',
                        imageUrl: '',
                        showUpdate: false,
                    };
                });
                return response.json();
            })
            .then(json => console.log(json));
    };
    deleteDress = (event: any) => {
        const id = event.currentTarget.name;
        fetch('https://mylitterdresslab.herokuapp.com/accessory/' + id, {
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
