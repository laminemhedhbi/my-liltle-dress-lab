import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container, Row, Button } from 'react-bootstrap';
interface State {
    orders: Array<any>;
}
export default class Orders extends Component<{}, State> {
    state: State = {
        orders: [],
    };
    render() {
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Client Email</th>
                            <th>Products</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {order.User.lastName}
                                        {order.User.firstName}
                                    </td>
                                    <td>{order.User.email}</td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {
                                                            order.itemProduct
                                                                .product._id
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            order.itemProduct
                                                                .product.name
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            order.itemProduct
                                                                .quantity
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            order.itemProduct
                                                                .product.price
                                                        }
                                                    </td>
                                                </tr>
                                                {order.itemAccessories.map(
                                                    (
                                                        accessory: any,
                                                        index: number,
                                                    ) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        accessory
                                                                            .accessory
                                                                            ._id
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        accessory
                                                                            .accessory
                                                                            .name
                                                                    }{' '}
                                                                    (type:
                                                                    {
                                                                        accessory
                                                                            .accessory
                                                                            .type
                                                                            .name
                                                                    }
                                                                    )
                                                                </td>
                                                                <td>
                                                                    {
                                                                        accessory.quantity
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        accessory
                                                                            .accessory
                                                                            .price
                                                                    }
                                                                </td>
                                                            </tr>
                                                        );
                                                    },
                                                )}
                                                <tr>
                                                    <td colSpan={3}>
                                                        total Price
                                                    </td>
                                                    <td>{order.totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={this.deleteOrder}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
    componentDidMount() {
        this.getData();
    }
    //api
    getData = () => {
        axios
            .get('http://mylitterdresslab.herokuapp.com/orders', {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'auth-token':
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwYjRiZjQ4MTdjMjFmNzhmZmU0MTYiLCJpYXQiOjE1ODQ0NDQ4MTh9.Y51DqoQkX7UbWz1W2LPeCduIMEkMIlrnXpdicDCM0Fg',
                },
            })
            .then(response => {
                this.setState({ orders: response.data });
            });
    };
    deleteOrder = (event: any) => {
        const id = event.currentTarget.name;
        fetch('https://mylitterdresslab.herokuapp.com/orders/' + id, {
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
