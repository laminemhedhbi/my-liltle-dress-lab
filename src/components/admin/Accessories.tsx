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
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { history } from '../history'

import SetAccessories from './Accessories/setAccessories'
import SelectDresses from './Accessories/SelectDresses'
import ShowImg from './showImg'

interface State {
    showInsert: boolean
    showPicture: boolean
    name: string
    price: string
    type: string
    imageUrl: any
    dressSelected: Array<string>
    accessories: Array<any>
    types: Array<any>
    dresses: Array<any>
    product: Array<any>
    loading: boolean
    imgWidth: string
    imgHeight: string
    imgLeft: string
    imgTop: string
}

interface FormValues {
    name: string
    price: string
    type: string
    imageUrl: any
    dress: any
}

export default class Accessories extends Component<{}, State> {
    state: State = {
        showInsert: false,
        showPicture: false,
        loading: true,
        name: '',
        price: '',
        type: '',
        imageUrl: {},
        accessories: [],
        dresses: [],
        types: [],
        product: [],
        dressSelected: [],
        imgWidth: '100',
        imgHeight: '100',
        imgLeft: '100',
        imgTop: '100',
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
            dress: [],
            imageUrl: '',
        }

        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .required('Required!'),
            type: Yup.string().required('Required!'),
            price: Yup.number().required('Required!'),
            dress: Yup.array().required('Required!'),
            imageUrl: Yup.mixed().required('Required!'),
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
                        <Button onClick={this.handler}>Create Accessory</Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row style={{ paddingTop: '20px' }}>
                    {this.state.accessories.map(
                        (accesory: any, index: number) => {
                            return (
                                <Col
                                    key={index}
                                    xs={5}
                                    md={2}
                                    onClick={() => {
                                        history.push(
                                            '/admin/accessory/' + accesory._id
                                        )
                                    }}
                                >
                                    <Card>
                                        <Card.Title></Card.Title>
                                        <Card.Img
                                            variant="top"
                                            src={accesory.img.url}
                                            style={{
                                                width: '100%',
                                                height: '150px',
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
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        }
                    )}
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
                                        Create a new accesory
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormGroup controlId="name">
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
                                    <FormGroup controlId="type">
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
                                            {this.state.types.map(
                                                (types: any, index: number) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={types._id}
                                                        >
                                                            {types.name}
                                                        </option>
                                                    )
                                                }
                                            )}
                                        </FormControl>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="type" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup controlId="price">
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
                                    <FormGroup controlId="dress">
                                        <FormLabel>Select Dresses</FormLabel>
                                        <SelectDresses
                                            product={this.state.product}
                                            dressSelected={
                                                this.state.dressSelected
                                            }
                                            dressSelect={this.dressSelect}
                                            setFieldValue={formik.setFieldValue}
                                            handleBlur={formik.handleBlur}
                                        />
                                        <ErrorMessage name="dress" />
                                    </FormGroup>
                                    <FormGroup controlId="imageUrl">
                                        <FormLabel>Image</FormLabel>
                                        <ShowImg img={formik.values.imageUrl} />
                                        <FormControl
                                            type="file"
                                            name="imageUrl"
                                            onChange={(e: any) => {
                                                formik.setFieldValue(
                                                    'imageUrl',
                                                    e.target.files[0]
                                                )
                                            }}
                                            accept="image.png"
                                            onBlur={formik.handleBlur}
                                            style={
                                                formik.errors.imageUrl ||
                                                !formik.values.imageUrl
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <span>Select png file</span>
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="imageUrl" />
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
                {/* Modal Picture*/}
                <SetAccessories
                    showPicture={this.state.showPicture}
                    img={this.state.imageUrl}
                    imgWidth={this.state.imgWidth}
                    imgHeight={this.state.imgHeight}
                    imgLeft={this.state.imgLeft}
                    imgTop={this.state.imgTop}
                    dresses={this.state.dresses}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handlerPicture={this.handlerPicture}
                />
            </Container>
        )
    }

    componentDidMount() {
        this.getData()
    }

    //event
    getData = () => {
        axios
            .get('https://mylittledresslab.herokuapp.com/accessory')
            .then(data => {
                this.setState({
                    accessories: data.data,
                    loading: false,
                })
            })
        axios.get('https://mylittledresslab.herokuapp.com/type').then(data => {
            this.setState({
                types: data.data,
            })
        })
        axios
            .get('https://mylittledresslab.herokuapp.com/product')
            .then(data => {
                this.setState({
                    product: data.data,
                })
            })
    }

    dressSelect = (items: Array<any>) => {
        this.setState({ dressSelected: items })
    }

    handleChange = (event: any) => {
        const name = event.target.name
        let value
        event.target.type === 'file'
            ? (value = event.target.files[0])
            : (value = event.target.value)
        this.setState({
            [name]: value,
        } as Pick<State, any>)
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        const {
            name,
            type,
            price,
            imageUrl,
            imgWidth,
            imgHeight,
            imgLeft,
            imgTop,
            dressSelected,
        } = this.state
        // @ts-ignore
        let token: string = sessionStorage.getItem('admin-token')
        const accessories = new FormData()
        accessories.append('name', name)
        accessories.append('type', type)
        accessories.append('price', price)
        accessories.append('dress', dressSelected.join())
        accessories.append('img', imageUrl)
        accessories.append('imgWidth', imgWidth)
        accessories.append('imgHeight', imgHeight)
        accessories.append('imgLeft', imgLeft)
        accessories.append('imgTop', imgTop)
        const options: RequestInit = {
            body: accessories,
            headers: {
                'auth-token': token,
            },
        }
        let url = 'https://mylittledresslab.herokuapp.com/accessory'
        options.method = 'POST'
        fetch(url, options)
            .then(async response => {
                this.getData()
                this.setState(prev => {
                    return {
                        name: '',
                        price: '',
                        type: '',
                        imageUrl: {},
                        dressSelected: [],
                        showPicture: false,
                    }
                })
                return response.json()
            })
            .then(json => console.log(json))
    }

    handler = () => {
        this.setState(prev => {
            return { showInsert: !prev.showInsert }
        })
    }

    handlerPicture = () => {
        this.setState({
            showPicture: false,
            name: '',
            type: '',
            price: '',
            imageUrl: {},
            dressSelected: [],
        })
    }

    formSubmit = (values: any, { setSubmitting }: any) => {
        const { name, type, price, imageUrl } = values
        this.setState(prev => {
            let dresses: Array<any> = []
            prev.product.map(dress => {
                if (prev.dressSelected.indexOf(dress._id) !== -1) {
                    dresses.push(dress)
                }
                return null
            })
            return {
                showInsert: false,
                showPicture: true,
                dresses,
                name,
                type,
                price,
                imageUrl,
            }
        })
        setSubmitting(false)
    }
}
