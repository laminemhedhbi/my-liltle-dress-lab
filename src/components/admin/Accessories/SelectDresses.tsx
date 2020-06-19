import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'
import { components } from 'react-select'
import { Row, Col } from 'react-bootstrap'

interface Props {
    product: Array<any>
    dressSelected: Array<String>
    dressSelect(id: Array<String>): void
    setFieldValue(name: string, fild: any): void
    handleBlur(): void
}

interface State {
    option: Array<any>
    dress: Array<any>
}

interface dress {
    name: string
    img: string
}

const MultiValue = (props: any) => (
    <components.MultiValue {...props}>{props.data.label}</components.MultiValue>
)

export default class Accessories extends Component<Props, State> {
    state = { option: [{}], dress: [] }

    render() {
        if (this.state.option.length !== this.props.product.length)
            this.getData()

        const formatOptionLabel = ({ value, label, img }: any) => (
            <Row>
                <Col>
                    <img src={img} style={{ width: '50px' }} alt="dress" />
                </Col>
                <Col>{label}</Col>
            </Row>
        )
        return (
            <AsyncSelect<dress>
                value={this.state.dress}
                components={{ MultiValue }}
                onBlur={this.props.handleBlur}
                isMulti
                loadOptions={this.loadOptions}
                formatOptionLabel={formatOptionLabel}
                defaultOptions
                onChange={this.handlerChange}
                name="dress"
            />
        )
    }

    //event
    getData = () => {
        const dress: Array<any> = []
        const option: Array<any> = []
        this.props.product.map((item: any) => {
            option.push({
                value: item._id,
                label: item.name,
                img: item.img.url,
            })
            if (this.props.dressSelected.indexOf(item._id) !== -1)
                dress.push(option[option.length - 1])
            return null
        })
        this.setState({
            option,
            dress,
        })
    }

    filterDress = (inputValue: string) => {
        return this.state.option.filter((i: any) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }

    loadOptions = (inputValue: string, callback: (arg0: any) => void) => {
        setTimeout(() => {
            callback(this.filterDress(inputValue))
        }, 1000)
    }

    handlerChange = (event: any) => {
        let value: Array<any> = []
        event.map((item: any) => {
            value.push(item.value)
            return 0
        })
        this.props.dressSelect(value)
        this.setState({ dress: event })
        this.props.setFieldValue('dress', value)
    }
}
