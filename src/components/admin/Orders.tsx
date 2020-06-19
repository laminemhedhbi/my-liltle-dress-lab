import React, { Component } from 'react'
import {
    Table,
    Container,
    Button,
    Spinner,
    Row,
    Col,
    Modal,
} from 'react-bootstrap'
import { history } from '../history'

interface State {
    commandes: Array<any>
    loading: boolean
    showPicture: boolean
    productPicture: any
    accessory: Array<any>
}

export default class Orders extends Component<{}, State> {
    state: State = {
        commandes: [],
        loading: true,
        showPicture: false,
        productPicture: '',
        accessory: [],
    }

    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        return (
            <Container>
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Client Name</th>
                            <th>Client Email</th>
                            <th>Products</th>
                            <th>Information</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.commandes.map(
                            (order: any, index: number) => {
                                order.date = new Date(order.date)
                                return (
                                    <tr key={index}>
                                        <td>
                                            {order.user.last} {order.user.first}
                                        </td>
                                        <td>{order.user.email}</td>
                                        <td style={{ padding: 'inherit' }}>
                                            <div>
                                                <Table
                                                    responsive="sm"
                                                    style={{ width: '100%' }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Color</th>
                                                            <th>type</th>
                                                            <th>Price</th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    order
                                                                        .itemProduct
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                <div
                                                                    style={{
                                                                        width:
                                                                            '20px',
                                                                        height:
                                                                            '20px',
                                                                        borderRadius:
                                                                            '50%',
                                                                        backgroundColor:
                                                                            order
                                                                                .itemProduct
                                                                                .color,
                                                                    }}
                                                                ></div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    order
                                                                        .itemProduct
                                                                        .type
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    order
                                                                        .itemProduct
                                                                        .price
                                                                }
                                                            </td>
                                                        </tr>
                                                        {order.itemAccessories.map(
                                                            (
                                                                accessory: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {
                                                                                accessory.name
                                                                            }
                                                                        </td>
                                                                        <td></td>
                                                                        <td>
                                                                            {
                                                                                accessory
                                                                                    .type
                                                                                    .name
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                accessory.price
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                        <tr>
                                                            <td colSpan={3}>
                                                                total Price
                                                            </td>
                                                            <td>
                                                                {
                                                                    order.totalPrice
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                        <td>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    Date:
                                                </span>{' '}
                                                {order.date.getDate()}/
                                                {order.date.getMonth()}/
                                                {order.date.getFullYear()}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    Time:
                                                </span>{' '}
                                                {order.date.getHours()}:
                                                {order.date.getMinutes()}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    size:
                                                </span>{' '}
                                                {order.size}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    weight:
                                                </span>{' '}
                                                {order.weight}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    dressSize:
                                                </span>{' '}
                                                {order.dressSize}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    brassiere:
                                                </span>{' '}
                                                {order.brassiere}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    inConfort:
                                                </span>{' '}
                                                {order.inConfort}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    Large:
                                                </span>{' '}
                                                {order.large}
                                            </p>
                                            <p>
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        color: '#898a8e',
                                                    }}
                                                >
                                                    dressCut:
                                                </span>{' '}
                                                {order.dressCut}
                                            </p>
                                        </td>
                                        <td>
                                            <div>
                                                <Button
                                                    name={order._id}
                                                    variant="info"
                                                    onClick={this.showModel}
                                                >
                                                    Model
                                                </Button>
                                            </div>
                                            <div className="mt-1">
                                                <Button
                                                    name={order._id}
                                                    variant="danger"
                                                    onClick={this.deleteOrder}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </Table>
                <Modal show={this.state.showPicture}>
                    <Modal.Header>
                        <Modal.Title>Model</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <img
                                        alt="model"
                                        src={this.state.productPicture.url}
                                        style={{
                                            width: '215px',
                                            height: '534px',
                                        }}
                                    />
                                    {this.state.accessory.map(
                                        (accessory: any, index: number) => {
                                            return (
                                                <img
                                                    key={index}
                                                    alt="model"
                                                    src={accessory.img.url}
                                                    style={{
                                                        width:
                                                            accessory.imgWidth +
                                                            'px',
                                                        height:
                                                            accessory.imgHeight +
                                                            'px',
                                                        left:
                                                            accessory.imgLeft +
                                                            'px',
                                                        top:
                                                            accessory.imgTop +
                                                            'px',
                                                        position: 'absolute',
                                                        zIndex: 30,
                                                    }}
                                                />
                                            )
                                        }
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModel}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

    componentDidMount() {
        this.getData()
    }

    //api
    getData = () => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)
        fetch('https://mylittledresslab.herokuapp.com/order', {
            method: 'GET',
            headers,
        })
            .then(async response => {
                const data = await response.json()
                this.setState({ commandes: data, loading: false })
            })
            .catch(err => console.log(err))
    }

    showModel = (event: any) => {
        const id = event.currentTarget.name
        const element = this.state.commandes.find(x => x._id === id)
        this.setState({
            productPicture: element.itemProduct.model,
            accessory: element.itemAccessories,
            showPicture: true,
        })
    }

    closeModel = () => {
        this.setState({
            showPicture: false,
        })
    }

    deleteOrder = (event: any) => {
        const id = event.currentTarget.name
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        fetch('https://mylittledresslab.herokuapp.com/order/' + id, {
            method: 'DELETE',
            headers,
        })
            .then(response => response.json())
            .then(json => {
                this.getData()
                console.log(json)
            })
    }
}
