import React, { Component } from 'react'
import {
    Modal,
    Button,
    Container,
    Row,
    Col,
    Card,
    Spinner,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap'
import { history } from '../history'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'

import ShowImg from './showImg'

interface State {
    showUpdate: boolean
    model: any
    img: any
    realImg: any
    dress: any
    loading: boolean
    show: boolean
}

interface FormValues {
    name: string
    price: string
    type: string
    color: string
}

export default class DetailsDress extends Component<{}, State> {
    state: State = {
        showUpdate: false,
        model: {},
        img: {},
        realImg: {},
        dress: {},
        loading: true,
        show: false,
    }
    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        const { showUpdate } = this.state
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )

        const initialValues: FormValues = {
            name: this.state.dress.name,
            price: this.state.dress.price,
            type: this.state.dress.type,
            color: this.state.dress.color,
        }

        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .required('Required!'),
            type: Yup.string().required('Required!'),
            price: Yup.number().required('Required!'),
            color: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
        })

        return (
            <Container>
                {/*btn */}
                <Row>
                    <Col
                        style={{
                            justifyContent: 'flex-end',
                            display: 'flex',
                        }}
                    >
                        <Button
                            onClick={this.handlerUpdate}
                            className="mr-1"
                            variant="primary"
                        >
                            Edit
                        </Button>
                        <Button onClick={this.deleteDress} variant="danger">
                            Delete
                        </Button>
                    </Col>
                </Row>
                {/*detaile dress */}
                <Row className="mt-3">
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Row
                            style={{
                                border: '1px solid #7b7b7b',
                            }}
                            className="py-4 px-5"
                        >
                            <Col>
                                <img
                                    alt="dress"
                                    src={this.state.dress.img.url}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'whitesmoke',
                                    }}
                                />
                            </Col>
                            <Col
                                style={{
                                    fontFamily: 'Old Standard TT',
                                }}
                            >
                                <h5>Details Dress : </h5>
                                <div className="mt-5">
                                    <Row>
                                        <Col>
                                            <Row>
                                                Name:
                                                <Col>
                                                    {this.state.dress.name}
                                                </Col>
                                            </Row>
                                            <Row>
                                                Type:
                                                <Col>
                                                    {this.state.dress.type}
                                                </Col>
                                            </Row>
                                            <Row>
                                                Price:
                                                <Col>
                                                    {this.state.dress.price}
                                                </Col>
                                            </Row>

                                            <Row>
                                                Color:
                                                <Col>
                                                    <div
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '50%',
                                                            backgroundColor: this
                                                                .state.dress
                                                                .color,
                                                        }}
                                                    ></div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <Row>
                                    <Col
                                        style={{
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                        }}
                                    >
                                        <Button
                                            onClick={this.showModal}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Model
                                        </Button>

                                        <Button onClick={this.showModal}>
                                            reel image
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/*Accessories */}
                <div className="mt-3">
                    <p style={{ fontWeight: 'bold' }}>ACCESORIES</p>
                    <Row>
                        {this.state.dress.accessories.map(
                            (accessory: any, index: number) => {
                                return (
                                    <Col key={index} xs={5} md={2}>
                                        <Card>
                                            <Card.Title></Card.Title>
                                            <Card.Img
                                                variant="top"
                                                src={accessory.img.url}
                                                style={{
                                                    width: '100%',
                                                    height: '130px',
                                                }}
                                            />
                                            <Card.Body></Card.Body>
                                            <Card.Footer>
                                                Name: {accessory.name}
                                                <br />
                                                Price: {accessory.price}
                                                <br />
                                                type:{accessory.type.name}
                                                <Row
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                ></Row>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                </div>
                {/*model show */}
                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Model
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ justifyContent: 'center' }}>
                        <img
                            alt="model"
                            src={this.state.dress.model.url}
                            style={{
                                width: '231px',
                                marginLeft: '25%',
                            }}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={this.hideModal}
                            style={{
                                justifyContent: 'flex-end',
                            }}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*Real Img show */}
                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Real Image
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            alt="real img"
                            src={this.state.dress.realImg.url}
                            style={{
                                width: '231px',
                                marginLeft: '25%',
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.hideModal}
                            style={{
                                justifyContent: 'flex-end',
                            }}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal  Update*/}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.formSubmit}
                >
                    {(formik: any) => (
                        <Form>
                            <Modal show={showUpdate}>
                                <Modal.Header>
                                    <Modal.Title>Update a dress</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormGroup>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.name ||
                                                !formik.values.name
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="name" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.type}
                                            as="select"
                                            name="type"
                                            style={
                                                formik.errors.type ||
                                                !formik.values.type
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        >
                                            <option value=""></option>
                                            <option value="0">business</option>
                                            <option value="1">casual</option>
                                            <option value="2">glam</option>
                                        </FormControl>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="type" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl
                                            name="price"
                                            type="number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.price}
                                            style={
                                                formik.errors.price ||
                                                !formik.values.price
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="price" />
                                        </div>
                                    </FormGroup>
                                    ​
                                    <FormGroup>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl
                                            name="color"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.color}
                                        />
                                        <ErrorMessage name="color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Image</FormLabel>
                                        ​​
                                        <ShowImg img={this.state.img} />
                                        <FormControl
                                            type="file"
                                            name="img"
                                            onChange={this.handleChange}
                                            accept="image.png"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Model</FormLabel>
                                        ​​
                                        <ShowImg img={this.state.model} />
                                        <FormControl
                                            type="file"
                                            name="model"
                                            onChange={this.handleChange}
                                            accept="image.png"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Reel Image</FormLabel>
                                        ​​
                                        <ShowImg img={this.state.realImg} />
                                        <FormControl
                                            type="file"
                                            name="reelImg"
                                            onChange={this.handleChange}
                                            accept="image.png"
                                        />
                                    </FormGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        type="submit"
                                        onClick={formik.handleSubmit}
                                        disabled={
                                            !(formik.isValid && formik.dirty)
                                        }
                                    >
                                        Submit
                                    </Button>
                                    <Button onClick={this.handlerUpdate}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Form>
                    )}
                </Formik>
            </Container>
        )
    }

    componentDidMount() {
        this.getData()
    }

    //event
    getData = () => {
        const url = window.location.href.split('/')

        const id = url[url.length - 1]

        // @ts-ignore
        let token: string = sessionStorage.getItem('admin-token')

        axios
            .get(`https://mylittledresslab.herokuapp.com/product/` + id, {
                headers: {
                    'auth-token': token,
                },
            })

            .then(data => {
                this.setState({
                    dress: data.data,
                })
                this.setState({ loading: false })
            })
    }
    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }

    handleChange = (event: any) => {
        const name = event.target.name
        let value
        event.target.type === 'file'
            ? (value = event.target.files[0])
            : (value = event.target.value)
        this.setState({ [name]: value } as Pick<State, any>)
    }

    handlerUpdate = () => {
        this.setState(prev => {
            return { showUpdate: !prev.showUpdate }
        })
    }

    formSubmit = (values: any, { setSubmitting }: any) => {
        const id = this.state.dress._id

        const { name, type, color, price } = values
        const { img, model, realImg } = this.state

        this.setState({ loading: true })
        // @ts-ignore
        let token: string = sessionStorage.getItem('admin-token')
        const dress = new FormData()
        dress.append('name', name)
        dress.append('type', type)
        dress.append('color', color)
        dress.append('price', price)
        dress.append('img', img)
        dress.append('model', model)
        dress.append('reelImg', realImg)

        const options: RequestInit = {
            method: 'PUT',
            body: dress,
            headers: {
                'auth-token': token,
            },
        }
        let url = 'https://mylittledresslab.herokuapp.com/product/' + id

        fetch(url, options)
            .then(async response => {
                this.getData()
                this.setState(prev => {
                    return {
                        model: {},
                        img: {},
                        realImg: {},
                        showUpdate: false,
                    }
                })
                return response.json()
            })
            .then(json => console.log(json))
        setSubmitting(false)
    }

    deleteDress = async () => {
        const id = this.state.dress._id
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        await fetch('https://mylittledresslab.herokuapp.com/product/' + id, {
            method: 'DELETE',
            headers,
        })
        history.push('/admin/dresses')
    }
}
