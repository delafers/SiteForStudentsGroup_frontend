import axios from 'axios';
const debug = false
const API_URL = 'https://debug.aficionadoleague.ru/'

if (debug !== true){
    const API_URL = 'https://debug.aficionadoleague.ru/'}

export default class InfoService{
    getInfo() {
        const url = `${API_URL}/api/info/`;
        return axios.get(url).then(response => response.data);
    }
}