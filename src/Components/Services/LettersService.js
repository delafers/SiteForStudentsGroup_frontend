import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class LettersService{

    getLetters() {
        const url = `${API_URL}/api/letters/`;
        return axios.get(url).then(response => response.data);
    }
    getLettersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getLetter(id) {
        const url = `${API_URL}/api/letters/${id}`;
        return axios.get(url).then(response => response.data);
    }
}