import * as React from 'react'
import { Card, Modal, Button } from 'react-bootstrap'

interface Props {
    showOrders: boolean
    product: any
    accessories: Array<any>
    handleOrders(): void
    removeDress(): void
    remove(index: number): void
    submitOrder(): void
}

class OrderCheck extends React.Component<Props, {}> {
    render() {
        return (
            <Modal
                className="modal"
                show={this.props.showOrders}
                onHide={this.props.handleOrders}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Check your order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(184, 164, 170, 0)',
                            height: '8rem',
                            marginTop: '10%',
                        }}
                    >
                        <Card.Img
                            variant="top"
                            height="100%"
                            style={{
                                width: '25%',
                            }}
                            src={this.props.product.img.url}
                        />

                        <Card.Body
                            style={{
                                marginTop: '-16%',
                            }}
                        >
                            <Card.Title
                                style={{
                                    textAlign: 'center',

                                    marginTop: '-8%',
                                }}
                            >
                                {this.props.product.name}
                                <br />
                                Price :{this.props.product.price}
                                DT
                                <br />
                                <Button
                                    style={{
                                        float: 'right',
                                    }}
                                    onClick={() => this.props.removeDress()}
                                >
                                    Remove
                                </Button>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    {this.props.accessories.map((accessory, index) => {
                        const { name, price, img } = accessory

                        return (
                            <Card
                                style={{
                                    width: '100%',
                                    backgroundColor: 'rgba(184, 164, 170, 0)',
                                    height: '8rem',
                                    marginTop: '10%',
                                }}
                                key={index}
                            >
                                <Card.Img
                                    variant="top"
                                    height="100%"
                                    style={{
                                        width: '25%',
                                    }}
                                    src={img.url}
                                />

                                <Card.Body
                                    style={{
                                        marginTop: '-16%',
                                    }}
                                >
                                    <Card.Title
                                        style={{
                                            textAlign: 'center',

                                            marginTop: '-8%',
                                        }}
                                    >
                                        {name}
                                        <br />
                                        Price :{price}
                                        DT
                                        <br />
                                        <Button
                                            style={{
                                                float: 'right',
                                            }}
                                            onClick={() =>
                                                this.props.remove(index)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleOrders}>Close</Button>
                    <Button onClick={this.props.submitOrder}>
                        validate your order
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default OrderCheck
