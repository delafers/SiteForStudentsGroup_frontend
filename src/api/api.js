import * as axios from "axios";

const debug = true
const baseURL = 'http://localhost:8000/'

if (debug !== true){
    const baseURL = 'https://aficionadoleague.ru/'}

/*const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
});*/

export const authAPI = {
    me(result) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${result}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch(baseURL + "auth/users/me/", requestOptions)
    },
    login(requestOptions) {
        return fetch(baseURL + "auth/jwt/create/", requestOptions)
    },
    logout() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch(baseURL + `auth/users/me/`, requestOptions)
    },
    auth(requestOptions) {
        debugger
        return fetch(baseURL + "auth/users/", requestOptions)
    },
    registrConfirm(requestOptions){
        debugger
        return fetch(baseURL + "auth/users/activation/", requestOptions)
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
        return fetch(baseURL + "auth/jwt/refresh/", requestOptions)
    }
}