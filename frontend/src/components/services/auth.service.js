import axios from 'axios';


const API_URL = 'http://localhost:4000/api/auth/';

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

    bizDetails(bizName, bizDecription, bizAddress, cacNumber, website, email, phoneNumber) {
        return axios.post(API_URL + "business/details",{
            bizName,
            bizDecription,
            bizAddress,
            cacNumber,
            website,
            email,
            phoneNumber,
        });
    }

    getCurrentuser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}


export default new AuthService();