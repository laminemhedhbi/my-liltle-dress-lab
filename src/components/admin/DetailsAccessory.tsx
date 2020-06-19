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
import { Form, Formik, ErrorMessage } from 'formik'

import SetAccessories from './Accessories/setAccessories'
import SelectDresses from './Accessories/SelectDresses'
import ShowImg from './showImg'

interface State {
    showUpdate: boolean
    showPicture: boolean
    name: string
    dressSelected: any
    price: string
    type: string
    accessory: any
    imgWidth: string
    imageUrl: any
    types: Array<any>
    imgHeight: string
    loading: boolean
    imgLeft: string
    imgTop: string
    product: Array<any>
    dresses: Array<any>
}

interface FormValues {
    name: string
    price: string
    type: string
    dress: any
}

export default class DetailsAccessory extends Component<{}, State> {
    state: State = {
        product: [],
        dresses: [],
        showUpdate: false,
        showPicture: false,
        loading: true,
        imageUrl: {},
        dressSelected: [],
        name: '',
        price: '',
        type: '',
        types: [],
        accessory: {},
        imgWidth: '100',
        imgHeight: '100',
        imgLeft: '100',
        imgTop: '100',
    }

    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        const { showUpdate } = this.state

        const initialValues: FormValues = {
            name: this.state.accessory.name,
            price: this.state.accessory.price,
            type: this.state.accessory.type
                ? this.state.accessory.type._id
                : '',
            dress: this.state.accessory.dress,
        }

        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            type: Yup.string().required('Required!'),
            price: Yup.number().required('Required!'),
            dress: Yup.array().required('Required!'),
        })

        return (
            <Container>
                <Row
                    style={{
                        justifyContent: 'flex-end',
                    }}
                >
                    <Col xs={5} md={2}>
                        <Button
                            onClick={this.handlerUpdate}
                            variant="secondary"
                            className="mr-1"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={this.deleteAccessories}
                            variant="secondary"
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
                <Row style={{ paddingTop: '20px' }}>
                    <Col xs={4} md={3}>
                        <div>
                            <img
                                alt="img"
                                src={this.state.accessory.img.url}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <p>Name: {this.state.accessory.name}</p>
                        <p>Type: {this.state.accessory.type.name}</p>
                        <p>Price: {this.state.accessory.price}</p>
                    </Col>
                </Row>
                <div style={{ paddingTop: '20px' }}>
                    <p style={{ fontWeight: 'bold' }}>Dresses</p>
                    <Row>
                        {this.state.accessory.dress.map(
                            (dress: any, index: number) => {
                                return (
                                    <Col key={index} xs={6} md={3}>
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
                                                    Name:
                                                    <Col> {dress.name}</Col>
                                                </Row>
                                                <Row>
                                                    Price:
                                                    <Col>{dress.price}DT</Col>
                                                </Row>
                                                <Row>
                                                    type:
                                                    <Col> {dress.type}</Col>
                                                </Row>
                                                <Row>
                                                    Color:
                                                    <Col>
                                                        <div
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius:
                                                                    '50%',
                                                                backgroundColor:
                                                                    dress.color,
                                                            }}
                                                        ></div>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                </div>
                ​{/* Modal  Update*/}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.formSubmit}
                >
                    {(formik: any) => (
                        <Form>
                            <Modal show={showUpdate}>
                                <Modal.Header>
                                    <Modal.Title>Update accessory</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <FormGroup>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl
                                                name="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />
                                            <ErrorMessage name="name" />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl
                                                name="price"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.price}
                                            />
                                            <ErrorMessage name="price" />
                                        </FormGroup>
                                        ​
                                        <FormGroup>
                                            <FormLabel>type</FormLabel>
                                            <FormControl
                                                as="select"
                                                name="type"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.type}
                                            >
                                                <option value=""></option>
                                                {this.state.types.map(
                                                    (
                                                        types: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    types._id
                                                                }
                                                            >
                                                                {types.name}
                                                            </option>
                                                        )
                                                    }
                                                )}
                                            </FormControl>
                                            <ErrorMessage name="type" />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                Select Dresses
                                            </FormLabel>
                                            <SelectDresses
                                                product={this.state.product}
                                                dressSelected={
                                                    this.state.dressSelected
                                                }
                                                dressSelect={this.dressSelect}
                                                setFieldValue={
                                                    formik.setFieldValue
                                                }
                                                handleBlur={formik.handleBlur}
                                            />
                                            <ErrorMessage name="dress" />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Image</FormLabel>
                                            ​​
                                            <ShowImg
                                                img={this.state.imageUrl}
                                            />
                                            <FormControl
                                                type="file"
                                                name="imageUrl"
                                                onChange={this.handleChange}
                                                accept="image.png"
                                            />
                                            <span>select png file</span>
                                        </FormGroup>
                                    </Form>
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
                ​{/* Modal Picture*/}
                <SetAccessories
                    showPicture={this.state.showPicture}
                    img={this.state.imageUrl}
                    imgAccessories={this.state.accessory.img.url}
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
        //@ts-ignore
        const id = this.props.match.params.id

        // @ts-ignore
        let token: string = sessionStorage.getItem('admin-token')

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

        axios
            .get(`https://mylittledresslab.herokuapp.com/accessory/` + id, {
                headers: {
                    'auth-token': token,
                },
            })

            .then(data => {
                this.setState({
                    accessory: data.data,
                })
                this.setState({ loading: false })
            })
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

    formSubmit = (values: any, { setSubmitting }: any) => {
        const { name, type, price } = values
        this.setState(prev => {
            let dresses: Array<any> = []
            prev.product.map(dress => {
                if (prev.dressSelected.indexOf(dress._id) !== -1) {
                    dresses.push(dress)
                }
                return null
            })
            return {
                showUpdate: false,
                showPicture: true,
                name,
                type,
                price,
                dresses,
            }
        })
        setSubmitting(false)
    }

    deleteAccessories = async () => {
        const id = this.state.accessory._id
        this.setState({ loading: true })
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)
        await fetch('https://mylittledresslab.herokuapp.com/accessory/' + id, {
            method: 'DELETE',
            headers,
        })
        history.push('/admin/accessories')
    }

    handlerUpdate = (event: any) => {
        if (this.state.showUpdate === false) {
            const {
                name,
                type,
                price,
                imgWidth,
                imgHeight,
                imgLeft,
                dress,
                imgTop,
            } = this.state.accessory

            let dressSelected: Array<string> = []
            dress.map((item: any) => {
                dressSelected.push(item._id)
                return 0
            })

            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    name,
                    dressSelected,
                    dresses: dress,
                    type: type._id,
                    price,
                    imgWidth,
                    imgHeight,
                    imgLeft,
                    imgTop,
                }
            })
        } else {
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    name: '',
                    type: '',
                    price: '',
                }
            })
        }
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        const id = this.state.accessory._id
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
            method: 'PUT',
            headers: {
                'auth-token': token,
            },
        }
        let url = 'https://mylittledresslab.herokuapp.com/accessory/' + id
        fetch(url, options)
            .then(async response => {
                this.getData()
                return response.json()
            })
            .then(json => console.log(json))
            .then(() => {
                this.setState({ showPicture: false, loading: false })
            })
    }

    handlerPicture = () => {
        this.setState(prev => {
            let dressSelected: Array<string> = []
            prev.dresses.map((item: any) => {
                dressSelected.push(item._id)
                return 0
            })
            return {
                showPicture: false,
                dressSelected,
                dresses: prev.accessory.dress,
            }
        })
    }

    dressSelect = (items: Array<any>) => {
        this.setState({ dressSelected: items })
    }
}
