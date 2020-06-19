import React from 'react'
import img from '../../assets/contact.jpg'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'

interface State {
    name: string
    message: string
    email: string
    phone: string
}

class contact extends React.Component<{}, State> {
    state: State = {
        name: '',
        message: '',
        email: '',
        phone: '',
    }
    render() {
        const { name, message, email, phone } = this.state
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h3 className="mt-3" style={{ color: '#5a5a5a' }}>
                                Contacte Nous
                            </h3>
                            <p className="mt-5">
                                <span
                                    style={{
                                        fontSize: '1.1em',
                                        marginRight: '2%',
                                        color: '#5a5a5a',
                                    }}
                                >
                                    Email :
                                </span>
                                exemple@exemple.com
                            </p>
                            <p className="mt-3">
                                <span
                                    style={{
                                        fontSize: '1.1em',
                                        marginRight: '2%',
                                        color: '#5a5a5a',
                                    }}
                                >
                                    Phone Number:
                                </span>
                                +216 12 345 678
                            </p>
                        </Col>
                        <Col
                            md={6}
                            style={{
                                fontFamily: 'old standart tt',
                                fontSize: '200%',
                                fontWeight: 'revert',
                            }}
                        >
                            <Form>
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        style={{
                                            fontSize: '0.7em',
                                            color: '#5a5a5a',
                                        }}
                                    >
                                        Name
                                    </Form.Label>
                                    <Col sm="10" style={{ margin: 'auto' }}>
                                        <Form.Control
                                            name="name"
                                            placeholder="Name"
                                            value={name}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        style={{
                                            fontSize: '0.7em',
                                            color: '#5a5a5a',
                                        }}
                                    >
                                        Email
                                    </Form.Label>
                                    <Col sm="10" style={{ margin: 'auto' }}>
                                        <Form.Control
                                            name="email"
                                            placeholder="email"
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        style={{
                                            fontSize: '0.7em',
                                            color: '#5a5a5a',
                                        }}
                                    >
                                        Phone Number
                                    </Form.Label>
                                    <Col sm="10" style={{ margin: 'auto' }}>
                                        <Form.Control
                                            name="Phone"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        style={{
                                            fontSize: '0.7em',
                                            color: '#5a5a5a',
                                        }}
                                    >
                                        Message
                                    </Form.Label>
                                    <Col sm="10" style={{ margin: 'auto' }}>
                                        <Form.Control
                                            as="textarea"
                                            rows="6"
                                            name="message"
                                            placeholder="Message"
                                            value={message}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Button
                                    variant="secondary"
                                    name="Send"
                                    onClick={this.sendSubmit}
                                    style={{
                                        width: '15%',
                                        marginLeft: '40%',
                                    }}
                                >
                                    Send
                                </Button>
                            </Form>
                        </Col>
                        <img src={img} alt="img" className="imgcontact" />
                    </Row>
                </Container>
            </div>
        )
    }
    handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value } as Pick<State, any>)
    }
    sendSubmit = (e: any) => {
        e.preventDefault()
        const { name, message, email, phone } = this.state
        const contact: any = {
            name,
            email,
            phone,
            message,
        }
        fetch('https://mylitterdresslab.herokuapp.com/contact', {
            method: 'POST',
            body: JSON.stringify(contact),
        })
    }
}

export default contact
