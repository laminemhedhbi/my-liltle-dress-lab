import React from 'react'
import {
    Row,
    Button,
    Col,
    Alert,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap'
import { history } from '../history'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'

interface State {
    alert: string
}

interface FormValues {
    first: string
    last: string
    phone: string
    email: string
    password: string
}

class SignUp extends React.Component<{}, State> {
    state: State = {
        alert: '',
    }

    render() {
        const initialValues: FormValues = {
            first: '',
            last: '',
            phone: '',
            email: '',
            password: '',
        }

        const validationSchema = Yup.object().shape({
            first: Yup.string()
                .min(2, 'Too Short!')
                .required('Required!'),
            last: Yup.string()
                .min(2, 'Too Short!')
                .required('Required!'),
            phone: Yup.string()
                .min(8, 'Too Short!')
                .required('Required!'),
            email: Yup.string()
                .required('Required!')
                .email('Email must be valid'),
            password: Yup.string()
                .min(8, 'Too Short!')
                .required('Required!')
                .matches(/^(?=.*[0-9])/, 'Must contain a number!')
                .matches(/^(?=.*[A-Za-z])/, 'Must contain a letter!'),
        })
        return (
            <Row className="SignIn">
                <Row id="SignInRow">
                    <Col sm={6} md={6} className="Colsignup2"></Col>
                    <Col
                        className="Colsignup"
                        sm={5}
                        md={6}
                        style={{
                            fontFamily: 'Old Standard TT',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                        }}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={this.formSubmit}
                        >
                            {(formik: any) => (
                                <Form>
                                    <label className="label">Sign Up</label>
                                    <FormGroup controlId="validationCustom01">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl
                                            name="first"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.first ||
                                                !formik.values.first
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="first" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup controlId="validationCustom02">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl
                                            name="last"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.last ||
                                                !formik.values.last
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="last" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup controlId="validationCustom03">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl
                                            name="phone"
                                            type="number"
                                            placeholder="Your Phone"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.phone ||
                                                !formik.values.phone
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="phone" />
                                        </div>
                                    </FormGroup>
                                    <FormGroup controlId="validationCustom04">
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl
                                            name="email"
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.email ||
                                                !formik.values.email
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="email" />
                                        </div>
                                    </FormGroup>

                                    <FormGroup controlId="validationCustom05">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            style={
                                                formik.errors.password ||
                                                !formik.values.password
                                                    ? {}
                                                    : {
                                                          border:
                                                              '1px solid green',
                                                      }
                                            }
                                        />
                                        <div style={{ color: 'red' }}>
                                            <ErrorMessage name="password" />
                                        </div>
                                    </FormGroup>
                                    <Row>
                                        <Col sm={6} md={6}>
                                            <Button
                                                variant="info"
                                                type="reset"
                                                style={{ marginLeft: '50%' }}
                                            >
                                                Reset
                                            </Button>
                                        </Col>
                                        <Col sm={6} md={6}>
                                            <Button
                                                onClick={formik.handleSubmit}
                                                type="submit"
                                                disabled={
                                                    !(
                                                        formik.isValid &&
                                                        formik.dirty
                                                    )
                                                }
                                            >
                                                Sign Up
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Col>
                                        <Alert
                                            style={{
                                                color: 'red',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {this.state.alert}
                                        </Alert>
                                    </Col>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Row>
        )
    }
    ///Events
    formSubmit = (account: any, { setSubmitting }: any) => {
        fetch('https://mylittledresslab.herokuapp.com/auth', {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json === 'user add') {
                    if (sessionStorage.getItem('pack')) {
                        //@ts-ignore
                        const quiz = JSON.parse(sessionStorage.getItem('pack'))
                        history.push('/content/' + quiz.product._id)
                    } else history.push('/')
                } else {
                    this.setState({ alert: json })
                }
            })
        setSubmitting(false)
    }
}
export default SignUp
