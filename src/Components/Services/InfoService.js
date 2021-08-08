import axios from 'axios';
const API_URL = 'http://80.78.240.154'

export default class InfoService{
    getInfo() {
        const url = `${API_URL}/api/info/`;
        return axios.get(url).then(response => response.data);
    }
}