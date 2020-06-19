import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export default class LandingPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col
                        style={{
                            fontFamily: 'old standart tt',
                            paddingTop: '5%',
                            textAlign: 'center',
                            fontWeight: 'inherit',
                            fontSize: '600%',
                            paddingBottom: '%',
                        }}
                    >
                        My little Dress Lab
                    </Col>
                </Row>
                <Row>
                    <Col
                        style={{
                            textAlign: 'center',
                            fontFamily: 'old standart tt',
                            fontSize: '200%',
                            fontWeight: 'revert',
                        }}
                    >
                        The multifunctional clothing for a leaner future
                    </Col>
                </Row>
            </Container>
        );
    }
}
