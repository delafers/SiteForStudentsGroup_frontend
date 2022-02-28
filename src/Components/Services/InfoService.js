import axios from 'axios';
const API_URL = 'https://dev.studorg.online/'
//const API_URL = 'https://studorg.online/'


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