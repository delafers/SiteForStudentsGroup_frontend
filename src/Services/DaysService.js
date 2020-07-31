import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DaysService{

    getDays() {
        const url = `${API_URL}/api/days/`;
        return axios.get(url).then(response => response.data);
    }
    getDaysByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getDay(id) {
        const url = `${API_URL}/api/days/${id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteDay(id){
        const url = `${API_URL}/api/days/${id}`;
        return axios.delete(url);
    }
    createDay(day){
        const url = `${API_URL}/api/days/`;
        return axios.post(url, day);
    }
    updateDay(day){
        const url = `${API_URL}/api/days/${day.id}`;
        return axios.put(url, day);
    }
}