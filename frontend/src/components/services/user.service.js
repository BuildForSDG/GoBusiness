import axios from 'axios';
import authHeader from './auth-header';


const API_URL = "/api/test/";

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getBusinessBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getInvestorBoard() {
        return axios.get(API_URL + 'investor', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();