import axios from 'axios';


const API_URL = '/api/auth/';

class AuthService {
    signIn(email, password) {
        return axios
            .post(API_URL + "signin",{
                email,
                password
            })
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    signOut() {
        localStorage.removeItem("user");
    }

    signUp(firstName, lastName, phoneNumber, email, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            phoneNumber,
            email,
            password
        });
    }

    getCurrentuser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}


export default new AuthService();