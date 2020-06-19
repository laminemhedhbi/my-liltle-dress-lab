import React from 'react'
import { Container, Row, Card, Button, Col } from 'react-bootstrap'
import { history } from '../history'

interface State {
    pack: Array<any>
    showPack: boolean
    product: any
    accessory: Array<any>
}

class Pack extends React.Component<{}, State> {
    state: State = {
        pack: [],
        showPack: false,
        product: {
            _id: '',
            name: '',
            price: '',
            color: '',
            img: '',
            model: '',
        },
        accessory: [],
    }

    render() {
        return (
            <Container>
                <Row className="RowPack">
                    {this.state.pack.map((prod, index) => {
                        return (
                            <Col sm={12} md={4}>
                                <Card>
                                    <b key={index}>Pack N°{index}</b>

                                    <br />
                                    <Card.Img
                                        variant="top"
                                        style={{
                                            height: '57%',
                                            width: '38%',
                                        }}
                                        src={prod.product.img.url}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            <Button
                                                style={{ marginRight: '5%' }}
                                                onClick={() =>
                                                    this.handleShow(index)
                                                }
                                            >
                                                Show
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    this.deletePack(index)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        )
    }

    //events
    componentDidMount = () => {
        this.fetchPack()
    }

    fetchPack = () => {
        //@ts-ignore
        const data = JSON.parse(localStorage.getItem('Pack'))
        this.setState({
            pack: data,
        })
    }

    handleShow = (index: any) => {
        sessionStorage.setItem('pack', JSON.stringify(this.state.pack[index]))
        history.push('/content/' + this.state.pack[index].product._id)
    }

    deletePack = (index: number) => {
        //@ts-ignore
        const data = JSON.parse(localStorage.getItem('Pack'))
        data.splice(index, 1)
        localStorage.setItem('Pack', JSON.stringify(data))
        this.setState({
            pack: data,
        })
    }
}
export default Pack
