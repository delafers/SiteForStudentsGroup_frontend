import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class LettersService{

    getPosts(params) {
        const url = `${API_URL}/api/demosnews/` + params;
        return axios.get(url).then(response => response.data);
    }
    getPostsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getPost(id) {
        const url = `${API_URL}/api/demosnews/${id}`;
        return axios.get(url).then(response => response.data);
    }
}