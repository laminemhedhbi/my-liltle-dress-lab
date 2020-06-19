import * as React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import check from '../../../assets/check.png'
import axios from 'axios'

interface Props {
    dressselected: string
    changeDress(id: string): void
}

interface State {
    dresses: Array<any>
}

class DressSelected extends React.Component<Props, State> {
    state = {
        dresses: [],
    }

    render() {
        return (
            <Row
                id="card"
                className="mt-4"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {this.state.dresses.map((dress: any, id) => {
                    const { img } = dress

                    return (
                        <Col xs={4} md={3} style={{ height: '100%' }} key={id}>
                            <Card
                                id="dress"
                                onClick={() =>
                                    this.props.changeDress(dress._id)
                                }
                            >
                                <img
                                    src={check}
                                    alt="check"
                                    style={
                                        dress._id.toString() ===
                                        this.props.dressselected.toString()
                                            ? {
                                                  width: '20%',
                                              }
                                            : {
                                                  width: '20%',
                                                  display: 'none',
                                              }
                                    }
                                />
                                <Card.Title
                                    style={{ textAlign: 'center' }}
                                    className="pt-2"
                                >
                                    {dress.type}
                                </Card.Title>
                                <Card.Img variant="top" src={img.url} />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }
    componentDidMount = () => {
        this.fetchDress()
    }

    fetchDress = async () => {
        let request = await axios.get(
            'https://mylittledresslab.herokuapp.com/product'
        )
        let data = request.data
        this.setState({ dresses: data })
    }
}

export default DressSelected
