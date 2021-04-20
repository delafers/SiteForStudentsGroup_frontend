import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
});

export const authAPI = {
    me(result) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${result}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch("http://localhost:8000/auth/users/me/", requestOptions)
    },
    login(requestOptions) {
        return fetch("http://localhost:8000/auth/jwt/create/", requestOptions)
    },
    logout() {
        return instance.delete(`auth/login/`)
    },
    auth(requestOptions) {
        debugger
        return fetch("http://localhost:8000/auth/users/", requestOptions)
    },
    registrConfirm(requestOptions){
        debugger
        return fetch("http://localhost:8000/auth/users/activation/", requestOptions)
    },
}
export const tokenAPI = {
    refreshAccess(){
        let a = document.cookie.split(/(\;)/)
        let myHeaders = new Headers();
        myHeaders.append("Cookie", `${a[0]}` );
        debugger
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            withCredentials: true
        };
        return fetch("http://localhost:8000/auth/jwt/refresh/", requestOptions)
    }
}