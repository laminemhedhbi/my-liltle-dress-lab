import * as React from 'react'
import { Col, Row } from 'react-bootstrap'

interface Props {
    dress: any
    accessories: Array<any>
}

class Model extends React.Component<Props, {}> {
    render() {
        return (
            <Row
                style={{
                    paddingTop: '20%',
                    marginLeft: '10%',
                }}
            >
                <Col xs={12} md={2}>
                    <img
                        src={this.props.dress.model.url}
                        alt="model"
                        style={{
                            width: '221px',
                            height: '534px',
                        }}
                    />
                    {this.props.accessories.map((item: any, index) => {
                        return (
                            <img
                                key={index}
                                src={item.img.url}
                                alt="accessory"
                                style={{
                                    width: item.imgWidth + 'px',
                                    height: item.imgHeight + 'px',
                                    left: item.imgLeft + 'px',
                                    top: item.imgTop + 'px',
                                    position: 'absolute',
                                    zIndex: 30,
                                }}
                            />
                        )
                    })}
                </Col>
            </Row>
        )
    }
}

export default Model
