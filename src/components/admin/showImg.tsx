import React, { Component } from 'react'

interface Props {
    img: any
    imgWidth?: string
    imgHeight?: string
}

interface State {
    img: string
    file: any
}

export default class Dresses extends Component<Props, State> {
    state: State = {
        img: '',
        file: {},
    }

    render() {
        if (this.state.file !== this.props.img) this.getImg()

        return (
            <div>
                <img
                    alt="img"
                    src={this.state.img}
                    style={
                        this.state.img.length !== 0
                            ? {
                                  display: 'block',
                                  width: this.props.imgWidth
                                      ? this.props.imgWidth
                                      : '100px',
                                  height: this.props.imgHeight
                                      ? this.props.imgHeight
                                      : '100px',
                              }
                            : { display: 'none' }
                    }
                />
            </div>
        )
    }

    getImg = () => {
        if (this.props.img && this.props.img.name) {
            let file = this.props.img
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = (e: any) => {
                if (reader.result)
                    this.setState({
                        img: reader.result.toString(),
                        file,
                    } as Pick<State, any>)
            }
        } else {
            this.setState({
                img: '',
                file: this.props.img,
            })
        }
    }
}
