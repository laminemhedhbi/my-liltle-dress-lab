import * as React from 'react'
import axios from 'axios'
import { Col, Row, Button } from 'react-bootstrap'

import 'react-animated-slider/build/horizontal.css'
import { UserQuiz } from './Types'

import Model from './Content/Model'
import AccessoriesSelect from './Content/AccessoriesSelect'
import Quiz from './Content/Quiz'
import RealModel from './Content/RealModel'

import OrderCheck from './Content/OrderCheck'
import { history } from '../history'

interface State {
    types: Array<any>
    accessory: Array<any>
    pack: any
    dress: any
    quiz: UserQuiz
    phone: string
    showInfo: boolean
    showTypes: boolean
    showOrders: boolean
    showModel: boolean

    Selectaccessory: Array<any>
}

class Content extends React.Component<{}, State> {
    state = {
        quiz: {
            soutiens_gorge: '',
            robe_essayez_larges: '',
            robe_essayez_serrée: '',
            dites_nous: '',
            poids: '',
            taille_de_robe: '',
            taille: '',
        },
        showInfo: false,
        showTypes: false,
        showOrders: false,
        showModel: false,
        phone: '',
        dress: {},
        accessory: [],
        types: [],
        Selectaccessory: [],
        pack: {
            product: {
                _id: '',
                name: '',
                price: '',
                color: '',
                img: '',
                model: '',
                realImg: '',
            },
            accessories: [],
        },
    }

    render() {
        return (
            <Row className="lab">
                <Col
                    sm={12}
                    md={6}
                    className="mt-5"
                    style={{ marginTop: '3%' }}
                >
                    <Row>
                        <AccessoriesSelect
                            handleTypes={this.handleTypes}
                            showTypes={this.state.showTypes}
                            types={this.state.types}
                            Selectaccessory={this.state.Selectaccessory}
                            handelFilter={this.handelFilter}
                            addAccessory={this.addAccessory}
                            showAll={this.showAll}
                        />
                        <Col sm={12} md={12} style={{ marginTop: '4%' }}>
                            <Row>
                                <Col xs={3}>
                                    <Button
                                        className="button"
                                        onClick={this.handlePack}
                                    >
                                        Save Model
                                    </Button>
                                </Col>
                                <Col xs={3} md={4}>
                                    <RealModel
                                        dress={this.state.pack.product}
                                        showModel={this.state.showModel}
                                        handleModel={this.handleModel}
                                    />
                                </Col>

                                <Col xs={3}>
                                    <Button
                                        className="button"
                                        onClick={this.handlerQuiz}
                                    >
                                        place order
                                    </Button>
                                </Col>

                                <Col xs={3} md={2}>
                                    <Button
                                        className="button"
                                        onClick={this.handleReset}
                                    >
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                            {/*Quiz*/}
                            <Quiz
                                phone={this.state.phone}
                                showInfo={this.state.showInfo}
                                quiz={this.state.showInfo}
                                handleInfo={this.handleInfo}
                                submitInfo={this.submitInfo}
                                onChange={this.onChange}
                            />
                            {/*Check Order*/}
                            <OrderCheck
                                showOrders={this.state.showOrders}
                                product={this.state.pack.product}
                                accessories={this.state.pack.accessories}
                                handleOrders={this.handleOrders}
                                removeDress={this.removeDress}
                                remove={this.remove}
                                submitOrder={this.submitOrder}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className="pack2">
                    {/*Model create*/}
                    <Model
                        dress={this.state.pack.product}
                        accessories={this.state.pack.accessories}
                    />
                </Col>
            </Row>
        )
    }

    //Event
    handleModel = () => {
        this.setState(prev => {
            return { showModel: !prev.showModel }
        })
    }
    handlerQuiz = () => {
        if (sessionStorage.getItem('token')) this.handleInfo()
        else {
            sessionStorage.setItem('pack', JSON.stringify(this.state.pack))
            history.push('/SignIn')
        }
    }

    submitInfo = (values: any, { setSubmitting }: any) => {
        const {
            taille,
            taille_de_robe,
            dites_nous,
            soutiens_gorge,
            robe_essayez_larges,
            robe_essayez_serrée,
            poids,
        } = values
        this.setState({
            quiz: {
                taille,
                taille_de_robe,
                dites_nous,
                soutiens_gorge,
                robe_essayez_larges,
                robe_essayez_serrée,
                poids,
            },
            showInfo: false,
            showOrders: true,
        })
        setSubmitting(false)
    }

    handleInfo = () => {
        this.setState(prev => {
            return { showInfo: !prev.showInfo }
        })
    }

    handleTypes = () => {
        this.setState(prev => {
            return { showTypes: !prev.showTypes }
        })
    }
    handleReset = () => {
        window.location.reload()
    }

    handleOrders = () => {
        this.setState(prev => {
            return { showOrders: !prev.showOrders }
        })
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState(prev => {
            return { quiz: { ...prev.quiz, [name]: value } }
        })
    }

    componentDidMount = () => {
        this.fetchDress()
        this.fetchTypeAccessories()
        this.fetchPhone()
    }

    fetchDress = async () => {
        const url = window.location.href.split('/')

        const id = url[url.length - 1]
        let request = await axios.get(
            'https://mylittledresslab.herokuapp.com/product/' + id
        )
        let data = request.data
        this.setState({
            dress: data,
            accessory: data.accessories,
            Selectaccessory: data.accessories,
        })

        if (sessionStorage.getItem('pack')) {
            //@ts-ignore
            const pack = JSON.parse(sessionStorage.getItem('pack'))
            this.setState({ pack })
            sessionStorage.removeItem('pack')
        } else {
            this.setState(prev => {
                return { pack: { product: data, accessories: [] } }
            })
        }
    }

    fetchTypeAccessories = async () => {
        let request = await axios.get(
            'https://mylittledresslab.herokuapp.com/type'
        )
        let data = request.data
        this.setState({ types: data })
    }

    fetchPhone = async () => {
        const key = sessionStorage.getItem('token')
        let request = await axios.get(
            'https://mylittledresslab.herokuapp.com/user/phone',
            { headers: { 'auth-token': key } }
        )
        let data = request.data
        this.setState({ phone: data })
    }

    handlePack = async () => {
        let pack: Array<any> = []
        if (localStorage.getItem('Pack'))
            //@ts-ignore
            pack = JSON.parse(localStorage.getItem('Pack'))
        pack.push(this.state.pack)

        localStorage.setItem('Pack', JSON.stringify(pack))
        alert('Model Saved ')
    }

    submitOrder = () => {
        this.handlePack()
        const {
            taille,
            taille_de_robe,
            dites_nous,
            soutiens_gorge,
            robe_essayez_larges,
            robe_essayez_serrée,
            poids,
        } = this.state.quiz

        const userInfo = {
            size: taille,
            weight: poids,
            dressSize: taille_de_robe,
            brassiere: soutiens_gorge,
            inConfort: robe_essayez_serrée,
            large: robe_essayez_larges,
            dressCut: dites_nous,
        }
        const key = sessionStorage.getItem('token')
        const accessoryPack = []

        for (let i = 0; i < this.state.pack.accessories.length; i++) {
            //@ts-ignore
            accessoryPack.push(this.state.pack.accessories[i]._id)
        }
        let body: any = {}
        if (this.state.pack.product) {
            body.itemProduct = this.state.pack.product._id
        }
        if (accessoryPack.length > 0) {
            body.itemAccessories = accessoryPack
        }
        if (userInfo) {
            body.userInformation = userInfo
        }
        fetch('https://mylittledresslab.herokuapp.com/order', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth-token': `${key}`,
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
        this.setState({ showOrders: false })
    }

    addAccessory = (id: number) => {
        const curentAccessory = this.state.Selectaccessory[id]
        this.setState(prev => {
            let prevpack = { ...prev.pack }
            if (
                prevpack.accessories.findIndex(
                    (element: any) => element === curentAccessory
                ) === -1
            )
                prevpack.accessories.push(curentAccessory)
            else
                prevpack.accessories.splice(
                    prevpack.accessories.findIndex(
                        (element: any) => element === curentAccessory
                    ),
                    1
                )
            return { pack: prevpack }
        })
    }

    remove = (id: number) => {
        this.setState(prev => {
            const pack = { ...prev.pack }
            pack.accessories.splice(id, 1)
            return { pack }
        })
    }

    removeDress = () => {
        this.setState(prev => {
            const pack = { ...prev.pack }
            delete pack.product
            return { pack }
        })
    }

    handelFilter = (index: any) => {
        //@ts-ignore
        var select = this.state.types[index]._id

        const prevstate = [...this.state.accessory]
        const accessoryFilter = prevstate.filter(
            //@ts-ignore
            (item: any) => item.type._id === select
        )
        this.setState({
            Selectaccessory: accessoryFilter,
            showTypes: false,
        })
    }
    showAll = () => {
        this.setState({ Selectaccessory: this.state.accessory })
    }
}

export default Content
