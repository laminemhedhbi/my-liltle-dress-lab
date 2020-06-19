import React, { Component } from 'react'
import axios from 'axios'
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
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { CirclePicker, ColorResult } from 'react-color'
import ShowImg from './showImg'

const colors = ['#000000', '#0000ff', '#ff0000']

interface State {
    showInsert: boolean
    dresses: Array<any>
    loading: boolean
}

interface FormValues {
    name: string
    price: string
    type: string
    img: any
    model: any
    realImg: any
}

export default class Dresses extends Component<{}, State> {
    state: State = {
        showInsert: false,
        dresses: [],
        loading: true,
    }

    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        const { showInsert } = this.state
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )

        const initialValues: FormValues = {
            name: '',
            price: '',
            type: '',
            img: '',
            model: '',
            realImg: '',
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
            img: Yup.mixed().required('Required!'),
            model: Yup.mixed().required('Required!'),
            realImg: Yup.mixed().required('Required!'),
        })
        return (
            <Container>
                {/* Top Content */}
                <Row
                    style={{
                        fontFamily: 'old standart tt',
                        paddingTop: '20px',
                    }}
                >
                    <Col style={{ textAlign: 'right' }}>
                        <Button onClick={this.handler}>Create Dress </Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row style={{ paddingTop: '20px' }}>
                    {this.state.dresses.map((dress: any, index: number) => {
                        return (
                            <Col
                                key={index}
                                xs={6}
                                md={3}
                                onClick={() => {
                                    history.push('/admin/dress/' + dress._id)
                                }}
                            >
                                <Card>
                                    <Card.Title></Card.Title>
                                    <Card.Img
                                        variant="top"
                                        src={dress.img.url}
                                        style={{
                                            width: '100%',
                                            height: '250px',
                                        }}
                                    />
                                    <Card.Body></Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            Name :<Col>{dress.name}</Col>
                                        </Row>
                                        <Row>
                                            Color :
                                            <Col>
                                                <div
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor:
                                                            dress.color,
                                                    }}
                                                ></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            Type :<Col>{dress.type}</Col>
                                        </Row>
                                        <Row>
                                            Price :<Col>{dress.price}DT</Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                ​{/* Modal  Insert*/}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.formSubmit}
                >
                    {(formik: any) => (
                        <Form>
                            <Modal show={showInsert}>
                                <Modal.Header>
                                    <Modal.Title>
                                        Create a new dress
                                    </Modal.Title>
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
                                            <option></option>
                                            <option value="Business">
                                                Business
                                            </option>
                                            <option value="Casual">
                                                Casual
                                            </option>
                                            <option value="Glam">Glam</option>
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
                                        <CirclePicker
                                            color={formik.values.color}
                                            colors={colors}
                                            onChangeComplete={(
                                                e: ColorResult
                                            ) => {
                                                formik.setFieldValue(
                                                    'color',
                                                    e.hex
                                                )
                                            }}
                                        />
                                        <ErrorMessage name="color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Image</FormLabel>
                                        ​<ShowImg img={formik.values.img} />
                                        <FormControl
                                            type="file"
                                            name="img"
                                            onChange={(e: any) => {
                                                formik.setFieldValue(
                                                    'img',
                                                    e.target.files[0]
                                                )
                                            }}
                                            accept="image.png"
                                            onBlur={formik.handleBlur}
                                            style={
                                                formik.errors.img ||
                                                !formik.values.img
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <span>Select png file</span>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="img" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Model</FormLabel>
                                        ​​
                                        <ShowImg img={formik.values.model} />
                                        <FormControl
                                            type="file"
                                            name="model"
                                            onChange={(e: any) => {
                                                formik.setFieldValue(
                                                    'model',
                                                    e.target.files[0]
                                                )
                                            }}
                                            accept="image.png"
                                            onBlur={formik.handleBlur}
                                            style={
                                                formik.errors.model ||
                                                !formik.values.model
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <span>Select png file</span>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="model" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Reel Image</FormLabel>
                                        ​​
                                        <ShowImg img={formik.values.realImg} />
                                        <FormControl
                                            type="file"
                                            name="realImg"
                                            onChange={(e: any) => {
                                                formik.setFieldValue(
                                                    'realImg',
                                                    e.target.files[0]
                                                )
                                            }}
                                            accept="image.png"
                                            onBlur={formik.handleBlur}
                                            style={
                                                formik.errors.realImg ||
                                                !formik.values.realImg
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <span>Select png file</span>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="realImg" />
                                        </div>
                                    </FormGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        onClick={formik.handleSubmit}
                                        type="submit"
                                        disabled={
                                            !(formik.isValid && formik.dirty)
                                        }
                                    >
                                        Submit
                                    </Button>
                                    <Button onClick={this.handler}>
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
        axios
            .get('https://mylittledresslab.herokuapp.com/product')
            .then(data => {
                this.setState({
                    dresses: data.data,
                    loading: false,
                })
            })
    }

    handler = () => {
        this.setState(prev => {
            return {
                showInsert: !prev.showInsert,
            }
        })
    }

    formSubmit = (values: any, { setSubmitting }: any) => {
        const { name, type, price, color, img, model, realImg } = values

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
        dress.append('realImg', realImg)
        const options: RequestInit = {
            method: 'POST',
            body: dress,
            headers: {
                'auth-token': token,
            },
        }
        fetch('https://mylittledresslab.herokuapp.com/product', options)
            .then(async response => {
                this.getData()
                this.setState(prev => {
                    return {
                        showInsert: false,
                    }
                })
                return response.json()
            })
            .then(json => console.log(json))
        setSubmitting(false)
    }
}
