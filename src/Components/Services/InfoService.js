import axios from 'axios';
const API_URL = 'https://devgang.online/'

export default class InfoService{
    getInfo() {
        const url = `${API_URL}api/info/`;
        return axios.get(url).then(response => response.data);
    }
}