import axios from 'axios';
const debug = false
const API_URL = 'https://debug.aficionadoleague.ru/'

if (debug !== true){
    const API_URL = 'https://debug.aficionadoleague.ru/'}


export default class DaysService{
    getDays(year, month) {
        if (String(month).length === 1) {month = '0' + String(month)};
        const url = `${API_URL}/api/calendar/days/${year}${month}`;
        return axios.get(url).then(response => response.data);
    }
    getDay(year, month, day) {
        if (String(month).length === 1) {month = '0' + String(month)};
        if (String(day).length === 1) {day = '0' + String(day)};
        const url = `${API_URL}/api/calendar/days/${year}${month}${day}`;
        return axios.get(url).then(response => response.data);
    }
}