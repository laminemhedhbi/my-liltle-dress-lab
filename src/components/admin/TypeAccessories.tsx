import React, { Component } from 'react'
import axios from 'axios'
import {
    Modal,
    Button,
    Container,
    Row,
    Col,
    Spinner,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap'
import { history } from '../history'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'

interface State {
    showInsert: boolean
    showUpdate: boolean
    _id: string
    name: string
    Types: Array<any>
    loading: boolean
}

interface FormValues {
    name: string
}

export default class TypeAccessories extends Component<{}, State> {
    state: State = {
        showInsert: false,
        showUpdate: false,
        _id: '',
        name: '',
        Types: [],
        loading: true,
    }

    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        const { showInsert, showUpdate } = this.state
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        const initialValues: FormValues = { name: this.state.name }

        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .required('Required!'),
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
                        <Button onClick={this.handler}>Create Type </Button>
                    </Col>
                </Row>
                ​{/* Main Content */}
                <Row className="mt-5">
                    {this.state.Types.map((type: any, index: number) => {
                        return (
                            <Col
                                key={index}
                                xs={6}
                                md={3}
                                style={{ textAlign: 'center' }}
                            >
                                <Row className="border py-4 mb-1">
                                    <Col xs={12} className="mb-4">
                                        {type.name}
                                    </Col>
                                    <Col xs={6}>
                                        <Button
                                            name={type._id}
                                            variant="success"
                                            onClick={this.handlerUpdate}
                                        >
                                            UpDate
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button
                                            name={type._id}
                                            onClick={this.deleteTypes}
                                            variant="danger"
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                </Row>
                ​{/* Modal  Insert*/}
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={validationSchema}
                    onSubmit={this.insertSubmit}
                >
                    {(formik: any) => (
                        <Form>
                            <Modal show={showInsert}>
                                <Modal.Header>
                                    <Modal.Title>Create a new type</Modal.Title>
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
                ​{/* Modal  Update*/}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.updateSubmit}
                >
                    {(formik: any) => (
                        <Form>
                            <Modal show={showUpdate}>
                                <Modal.Header>
                                    <Modal.Title>Update Type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
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
        axios.get('https://mylittledresslab.herokuapp.com/type').then(data => {
            this.setState({
                Types: data.data,
                loading: false,
            })
        })
    }

    handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value } as Pick<State, any>)
    }

    handler = () => {
        this.setState(prev => {
            return { showInsert: !prev.showInsert }
        })
    }

    handlerUpdate = (event: any) => {
        if (this.state.showUpdate === false) {
            const _id = event.currentTarget.name
            const types = this.state.Types.find(element => element._id === _id)
            const name = types.name
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id,
                    name,
                }
            })
        } else {
            this.setState(prev => {
                return {
                    showUpdate: !prev.showUpdate,
                    _id: '',
                    name: '',
                }
            })
        }
    }

    insertSubmit = (values: any, { setSubmitting }: any) => {
        const { name } = values

        const types: any = {
            name: name,
        }
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        fetch('https://mylittledresslab.herokuapp.com/type', {
            method: 'POST',
            body: JSON.stringify(types),
            headers,
        })
            .then(response => {
                this.setState(prev => {
                    return {
                        name: '',
                        Types: [...prev.Types, { name }],
                        showInsert: false,
                    }
                })
                return response.json()
            })
            .then(json => {
                console.log(json)
                this.getData()
            })

        setSubmitting(false)
    }

    updateSubmit = (values: any, { setSubmitting }: any) => {
        const { name } = values
        const { _id } = this.state

        const types: any = {
            name: name,
        }
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        fetch('https://mylittledresslab.herokuapp.com/type/' + _id, {
            method: 'PUT',
            body: JSON.stringify(types),
            headers,
        })
            .then(response => {
                this.getData()
                this.setState(prev => {
                    return {
                        _id: '',
                        name: '',
                        showUpdate: false,
                    }
                })
                return response.json()
            })
            .then(json => console.log(json))
        setSubmitting(false)
    }

    deleteTypes = (event: any) => {
        const id = event.currentTarget.name
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        fetch('https://mylittledresslab.herokuapp.com/type/' + id, {
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
