import * as axios from "axios";

const debug = true
const baseURL = 'http://localhost:8000/'

if (debug !== true){
    const baseURL = 'https://debug.aficionadoleague.ru/'}

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
export const mailAPI = {
    OneMail(mailId){
       return  axios.get(baseURL +`api/letters/` + mailId)
    }
}
export const NewsAPI = {
    getCurrentNews(tagsId){
        debugger
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        {tagsId == undefined? tagsId = "": tagsId = "?tags="+tagsId}
        return fetch(baseURL+"api/demosnews/posts/", requestOptions)
    }
}
export default class DaysService {
    getDays(year, month) {
        if (String(month).length === 1) {month = '0' + String(month)};
        const url = `${baseURL}/api/calendar/days/${year}${month}`;
        return axios.get(url).then(response => response.data);
    }
    getDay(year, month, day) {
        if (String(month).length === 1) {month = '0' + String(month)};
        if (String(day).length === 1) {day = '0' + String(day)};
        const url = `${baseURL}/api/calendar/days/${year}${month}${day}`;
        return axios.get(url).then(response => response.data);
    }
}

