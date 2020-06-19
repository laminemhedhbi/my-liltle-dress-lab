import * as React from 'react'
import {
    Col,
    Row,
    Card,
    InputGroup,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap'

interface Props {
    handleTypes(): void
    showTypes: boolean
    types: Array<any>
    Selectaccessory: Array<any>
    handelFilter(index: number): void
    addAccessory(index: number): void
    showAll(): void
}

class AccessoriesSelect extends React.Component<Props, {}> {
    render() {
        return (
            <Col className="step">
                <Row id="card" className="mt-4">
                    <Row>
                        <Col className="choose" xs={8} md={6}>
                            Choose Accessory
                        </Col>
                        <Col xs={4} md={6}>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Filter By Types "
                                    id="input-group-dropdown-1"
                                    style={{
                                        padding: '-1%',
                                        background:
                                            'linear-gradient(45deg, rgba(219, 216, 214, 0.69), rgba(255, 255, 255, 0.49))',
                                    }}
                                >
                                    {this.props.types.map(
                                        (typeAccessory, index) => {
                                            const { name } = typeAccessory

                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    onClick={() =>
                                                        this.props.handelFilter(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {name}
                                                </Dropdown.Item>
                                            )
                                        }
                                    )}
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={this.props.showAll}>
                                        Show All
                                    </Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {this.props.Selectaccessory.map((accessory, id) => {
                            const { img, name } = accessory

                            return (
                                <Col xs={5} md={3} key={id}>
                                    <Card
                                        style={{
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.41)',
                                            width: '100%',
                                        }}
                                        onClick={() =>
                                            this.props.addAccessory(id)
                                        }
                                    >
                                        <Card.Img
                                            variant="top"
                                            height="150px"
                                            src={img.url}
                                        />
                                        <Card.Footer
                                            style={{
                                                textAlign: 'center',
                                                backgroundColor:
                                                    'rgba(248, 248, 248, 0.35)',
                                                fontSize: '1.2em',
                                                fontWeight: 'normal',
                                            }}
                                        >
                                            {name}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Row>
            </Col>
        )
    }
}

export default AccessoriesSelect
