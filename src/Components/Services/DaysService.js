import axios from 'axios'
const API_URL = 'https://devgang.online/'


export default class DaysService{
    getDays(year, month) {
        if (String(month).length === 1) {month = '0' + String(month)}
        const url = `${API_URL}api/calendar/days/${year}${month}`
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(url, requestOptions).then(response => response.text());
    }
    getDay(year, month, day) {
        if (String(month).length === 1) {month = '0' + String(month)}
        if (String(day).length === 1) {day = '0' + String(day)}
        const url = `${API_URL}api/calendar/days/${year}${month}${day}`
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(url, requestOptions).then(response => response.text());
    }
}