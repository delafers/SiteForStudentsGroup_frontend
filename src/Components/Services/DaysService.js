import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DaysService{

    getDays(year, month) {
        const url = `${API_URL}/api/days/${year}${month}`;
        return axios.get(url).then(response => response.data);
    }
    getDay(day) {
        const url = `${API_URL}/api/days/${day}`;
        return axios.get(url).then(response => response.data);
    }
}