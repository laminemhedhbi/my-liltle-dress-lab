import axios from 'axios';
export const login = (admin: any) => {
    return axios
        .post('https://mylitterdresslab.herokuapp.com/auth/admin', {
            login: admin.login,
            password: admin.password,
        })
        .then(
            res => {
                sessionStorage.setItem('auth-token', JSON.stringify(res.data));

                return res.data;
            },
            error => {
                console.log(error);
            },
        );
};
