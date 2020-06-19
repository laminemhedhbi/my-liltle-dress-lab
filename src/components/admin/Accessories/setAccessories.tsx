import React, { Component } from 'react'
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap'
import ShowImg from '../showImg'

interface Props {
    showPicture: boolean
    img: any
    imgAccessories?: string
    imgWidth: string
    imgHeight: string
    imgLeft: string
    imgTop: string
    dresses: Array<any>
    handleChange(event: any): void
    handleSubmit(): void
    handlerPicture(): void
}

interface State {
    imgSelected: string
    dresses: Array<any>
}

export default class SetAccessories extends Component<Props, State> {
    state: State = {
        imgSelected: '',
        dresses: [],
    }

    render() {
        const { imgWidth, imgHeight, imgLeft, imgTop } = this.props

        const accessoryStyle = {
            width: imgWidth + 'px',
            height: imgHeight + 'px',
            left: imgLeft + 'px',
            top: imgTop + 'px',
            position: 'absolute',
            zIndex: 30,
        } as React.CSSProperties

        if (this.props.dresses[0] && this.props.dresses !== this.state.dresses)
            this.setState({
                imgSelected: this.props.dresses[0].model.url,
                dresses: this.props.dresses,
            })
        let img

        if (this.props.img && this.props.img.name) {
            img = (
                <span style={accessoryStyle}>
                    <ShowImg
                        img={this.props.img}
                        imgWidth={this.props.imgWidth + 'px'}
                        imgHeight={this.props.imgHeight + 'px'}
                    />
                </span>
            )
        } else {
            img = (
                <img
                    alt="accessory"
                    src={this.props.imgAccessories}
                    style={accessoryStyle}
                />
            )
        }
        return (
            <Modal show={this.props.showPicture}>
                <Modal.Header>
                    <Modal.Title>set Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="7" xs="8">
                                <img
                                    alt="model"
                                    src={this.state.imgSelected}
                                    style={{
                                        width: '215px',
                                        height: '534px',
                                    }}
                                />
                                {img}
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-5">
                        <Row className="justify-content-md-center">
                            {this.props.dresses.map(
                                (dress: any, index: number) => {
                                    return (
                                        <Col xs="2" key={index}>
                                            <img
                                                alt={index.toString()}
                                                onClick={this.changePicture}
                                                src={dress.img.url}
                                                style={{
                                                    width: '50px',
                                                    height: '100px',
                                                }}
                                            />
                                        </Col>
                                    )
                                }
                            )}
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>width</Form.Label>
                                                <Form.Control
                                                    name="imgWidth"
                                                    type="number"
                                                    value={imgWidth}
                                                    onChange={
                                                        this.props.handleChange
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>height</Form.Label>
                                                <Form.Control
                                                    name="imgHeight"
                                                    type="number"
                                                    value={imgHeight}
                                                    onChange={
                                                        this.props.handleChange
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>
                                                    margin left
                                                </Form.Label>
                                                <Form.Control
                                                    name="imgLeft"
                                                    type="number"
                                                    value={imgLeft}
                                                    onChange={
                                                        this.props.handleChange
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>
                                                    margin top
                                                </Form.Label>
                                                <Form.Control
                                                    name="imgTop"
                                                    type="number"
                                                    value={imgTop}
                                                    onChange={
                                                        this.props.handleChange
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleSubmit}>Submit</Button>
                    <Button onClick={this.props.handlerPicture}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    changePicture = (event: any) => {
        const key = parseInt(event.currentTarget.alt)
        this.setState(() => {
            const imgSelected = this.props.dresses[key].model.url
            return { imgSelected }
        })
    }
}
