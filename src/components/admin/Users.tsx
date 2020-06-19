import React, { Component } from 'react'
import { Table, Container, Button, Spinner } from 'react-bootstrap'
import { history } from '../history'

interface State {
    users: Array<any>
    loading: boolean
}

export default class Orders extends Component<{}, State> {
    state: State = {
        users: [],
        loading: true,
    }

    render() {
        if (!sessionStorage.getItem('admin-token')) history.push('/admin')
        if (this.state.loading)
            return (
                <div style={{ padding: '19% 0 0 50%' }}>
                    <Spinner animation="border" variant="dark" />
                </div>
            )
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Client Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {user.last} {user.first}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={this.deleteUser}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }

    componentDidMount() {
        this.getData()
    }

    //api
    getData = () => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)
        fetch('https://mylittledresslab.herokuapp.com/user', {
            method: 'GET',
            headers,
        })
            .then(async response => {
                const data = await response.json()
                this.setState({ users: data, loading: false })
            })
            .catch(err => console.log(err))
    }

    deleteUser = (event: any) => {
        const id = event.currentTarget.name
        const headers = new Headers()
        headers.append('Content-type', 'application/json; charset=UTF-8')
        const token = sessionStorage.getItem('admin-token')
        if (token) headers.append('auth-token', token)

        this.setState({ loading: true })

        fetch('https://mylittledresslab.herokuapp.com/user/' + id, {
            method: 'DELETE',
            headers,
        })
            .then(response => response.json())
            .then(json => {
                this.getData()
                console.log(json)
            })
    }
}
