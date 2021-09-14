import axios from 'axios';
const API_URL = 'https://dev.devgang.online/'

export default class InfoService{
    getInfo() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = `${API_URL}api/calendar/info/`;
        return fetch(url, requestOptions).then(response => response.text());
    }
}