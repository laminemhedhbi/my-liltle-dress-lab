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
    color: string;
    imageUrl: string;
    dresses: Array<any>;
}
export default class Dresses extends Component<{}, State> {
    state: State = {
        showInsert: false,
        showUpdate: false,
        _id: '',
        name: '',
        price: '',
        color: '',
        imageUrl: '',
        dresses: [],
    };
    render() {
        const { showInsert, showUpdate, name, price, color } = this.state;
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
                        <Button onClick={this.handler}>Create Dress </Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row style={{ paddingTop: '20px' }}>
                    {this.state.dresses.map((dress: any, index: number) => {
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
                                    <Card.Footer>
                                        Name: {dress.name}
                                        <br />
                                        Color: {dress.color}
                                        <br />
                                        Price: {dress.price}
                                        <br />
                                        <Row style={{ textAlign: 'center' }}>
                                            <Col>
                                                <Button
                                                    variant="danger"
                                                    name={dress._id}
                                                    onClick={this.deleteDress}
                                                >
                                                    Delete
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    variant="success"
                                                    name={dress._id}
                                                    onClick={this.handlerUpdate}
                                                >
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                ​{/* Modal  Insert*/}
                <Modal show={showInsert}>
                    <Modal.Header>
                        <Modal.Title>Create a new dress</Modal.Title>
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
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    name="color"
                                    value={color}
                                    onChange={this.handleChange}
                                    placeholder="Enter color"
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
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    name="color"
                                    value={color}
                                    onChange={this.handleChange}
                                    placeholder="Enter color"
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
            .get('http://mylitterdresslab.herokuapp.com/product')
            .then(data => {
                this.setState({
                    dresses: data.data,
                });
            });
    };

    handleChange = (event: any) => {
        const name = event.target.name;
        const value =
            event.target.type === 'file'
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
        if (this.state.showUpdate === false) {
            const _id = event.currentTarget.name;
            const dress = this.state.dresses.find(
                element => element._id === _id,
            );
            const { name, color, price, imageUrl } = dress;
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id,
                    name,
                    color,
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
                    color: '',
                    price: '',
                    imageUrl: '',
                };
            });
        }
    };
    InsertSubmit = (e: any) => {
        e.preventDefault();
        const { name, color, price, imageUrl } = this.state;
        const robe: any = {
            name: name,
            color: color,
            price: price,
            picture: imageUrl,
        };
        fetch('https://mylitterdresslab.herokuapp.com/product', {
            method: 'POST',
            body: JSON.stringify(robe),
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
                        price: '',
                        color: '',
                        imageUrl: '',
                        dresses: [
                            ...prev.dresses,
                            { name, color, price, imageUrl },
                        ],
                        showInsert: false,
                    };
                });
                return response.json();
            })
            .then(json => console.log(json));
    };
    UpdateSubmit = (e: any) => {
        e.preventDefault();
        const { _id, name, color, price, imageUrl } = this.state;
        const robe: any = {
            name: name,
            color: color,
            price: price,
        };
        if (imageUrl !== '') robe.picture = imageUrl;
        fetch('https://mylitterdresslab.herokuapp.com/product/' + _id, {
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
                        color: '',
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
        fetch('https://mylitterdresslab.herokuapp.com/product/' + id, {
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
