import * as React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

interface Props {
    dress: any
    accessories: Array<any>
    remove(id: any): void
}

class ItemSelected extends React.Component<Props, {}> {
    render() {
        let total = this.props.dress.price
        for (let i = 0; i < this.props.accessories.length; i++) {
            //@ts-ignore
            total += this.props.accessories[i].price
        }
        const text = `Total =${total}DT`

        return (
            <Col sm={12} md={3} className="card_pack">
                <div>
                    <p
                        style={{
                            float: 'left',
                            fontWeight: 'bold',
                        }}
                    >
                        MY CREATION :
                    </p>
                    <p
                        style={{
                            float: 'right',
                        }}
                    >
                        {text}
                    </p>
                </div>

                <Card className="pack">
                    <Card.Body
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.46)',
                        }}
                    >
                        <Card.Title
                            style={{
                                marginTop: '5%',
                            }}
                        >
                            <p
                                style={{
                                    float: 'left',
                                }}
                            >
                                <b>{this.props.dress.name}</b>
                            </p>

                            <p
                                style={{
                                    float: 'right',
                                }}
                            >
                                Prix: {this.props.dress.price}DT
                            </p>
                        </Card.Title>
                    </Card.Body>
                    {this.props.accessories.map((packed, id) => {
                        const { name, price } = packed

                        return (
                            <Card.Body
                                key={id}
                                style={{
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.46)',
                                }}
                            >
                                <Card.Title
                                    style={{
                                        marginTop: '5%',
                                    }}
                                >
                                    <p
                                        style={{
                                            float: 'left',
                                        }}
                                    >
                                        <b>{name}</b>
                                    </p>

                                    <p
                                        style={{
                                            float: 'right',
                                        }}
                                    >
                                        Prix: {price}DT
                                    </p>
                                    <Button
                                        className="Remouve"
                                        variant="dark"
                                        onClick={() => {
                                            this.props.remove(id)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Card.Title>
                            </Card.Body>
                        )
                    })}
                </Card>
            </Col>
        )
    }
}
export default ItemSelected
