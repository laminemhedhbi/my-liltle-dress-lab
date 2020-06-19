import { history } from '../history'

export const login = (user: any) => {
    return fetch('https://mylittledresslab.herokuapp.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
}

export const loginFacbook = (key: any) => {
    return fetch('https://mylittledresslab.herokuapp.com/auth/facebook', {
        method: 'POST',
        body: JSON.stringify(key),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem('token', json)
            if (sessionStorage.getItem('pack')) {
                //@ts-ignore
                const quiz = JSON.parse(sessionStorage.getItem('pack'))
                history.push('/content/' + quiz.product._id)
            } else history.push('/')
        })
}

export const loginGmail = (key: any) => {
    return fetch('https://mylittledresslab.herokuapp.com/auth/gmail' + key)
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem('token', json)
            if (sessionStorage.getItem('pack')) {
                //@ts-ignore
                const quiz = JSON.parse(sessionStorage.getItem('pack'))
                history.push('/content/' + quiz.product._id)
            } else history.push('/')
        })
}
