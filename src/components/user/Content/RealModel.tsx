import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
    dress: any

    showModel: boolean
    handleModel(): void
}

class RealModel extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <div className="button_cont">
                    <Button className="button" onClick={this.props.handleModel}>
                        Show real model
                    </Button>
                </div>
                <Modal className="modal" show={this.props.showModel}>
                    <Modal.Header>
                        <Modal.Title>Real Model</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={this.props.dress.realImg.url}
                            alt="Real model"
                            style={{
                                width: '221px',
                                height: '534px',
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleModel}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default RealModel
