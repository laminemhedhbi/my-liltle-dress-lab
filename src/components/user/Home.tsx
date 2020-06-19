import React, { Component } from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap'
import DressSelected from './Content/DressSelect'
import { history } from '../history'

interface State {
    dressselected: string
}
export default class home extends Component<{}, State> {
    state = {
        dressselected: '',
    }
    render() {
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Col
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <h1
                                style={{
                                    fontFamily: 'Old Standard TT',
                                    color: '#5b5b5b',
                                    textAlign: 'center',
                                }}
                            >
                                Select Your Favorite Style...
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DressSelected
                                dressselected={this.state.dressselected}
                                changeDress={this.changeDress}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                className="btncreate mt-5"
                                onClick={() => {
                                    history.push(
                                        '/content/' + this.state.dressselected
                                    )
                                }}
                                disabled={this.state.dressselected.length === 0}
                            >
                                Create your Dress
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    changeDress = (id: string) => {
        this.setState({ dressselected: id })
    }
}
