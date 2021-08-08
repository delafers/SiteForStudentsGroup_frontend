import * as axios from "axios";

const debug = false
const baseURL = 'http://80.78.240.154/'

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
        return fetch(baseURL + "auth/users/", requestOptions)
    },
    registrConfirm(requestOptions){
        return fetch(baseURL + "auth/users/activation/", requestOptions)
    },
}
export const tokenAPI = {
    refreshAccess(){
        debugger
        let i = 0
        let a = document.cookie.split(/(\;)/)
        console.log(document.cookie)
        for(i in a.length){
            let found = a[i].split(/=/)
            if(found[0] === "refresh"){
                console.log("рефреш найден")
            }
        i = i+2;
        }
        //let myHeaders = new Headers();
        //myHeaders.append("Cookie", `${a[2]}`);
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            withCredentials: true
        };
        return fetch(baseURL + "auth/jwt/refresh/", requestOptions)
    }
}
export const mailAPI = {
    OneMail(mailId){
       return  axios.get(baseURL +`api/letters/` + mailId)
    },
    mailCheck(){
        return axios.get(baseURL +"/api/letters/check_email/10")
    },
    getAllMails(){
        return axios.get(baseURL + `api/letters/?count=10&page=1`)
    },
    getCurrentPageMails(pageNumber){
        return axios.get(baseURL +`api/letters/?count=10&page=${pageNumber}`)
    }
}
export const NewsAPI = {
    getCurrentNews(tags){
        debugger
        let i = 0;
        let activeTag = "";
        if(tags != undefined) {
            if (tags != []) {
                while (i < tags.length) {
                    if(i === 0){
                    activeTag = tags[i]
                    i++
                    }else {
                        activeTag = activeTag+","+tags[i]
                        i++
                    }
                }
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                return fetch(baseURL + `api/demosnews/posts/?tags=${activeTag}`, requestOptions)
            }
        }
        {tags === undefined ? tags = "": tags = "?tags="+tags}
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(baseURL+`api/demosnews/posts/${tags}`, requestOptions)
    },
    sendNewPost(title, text, tag){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("text", text);
        formdata.append("tags", tag);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        return fetch(baseURL +"api/demosnews/posts/", requestOptions)
    },
    getAllTags(){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
       return  fetch(baseURL +"api/demosnews/tags/", requestOptions)

    }
}
export class DaysService {
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

