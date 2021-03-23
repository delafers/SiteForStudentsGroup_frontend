import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
    headers: {}
});

export const authAPI = {
    me() {
        return  instance.get(`auth/me`)
    },
    login(username, password) {
        debugger
        return instance.post(`auth/jwt/create/`, {username, password})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
    auth(username, email, password) {
        debugger
        return instance.post(`/auth/users/`, {username, email, password})
    }
}