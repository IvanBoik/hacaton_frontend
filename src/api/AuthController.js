import axios from 'axios';

export default class AuthController {
    static async login(userData) {
        const res = await axios.post(`http://192.168.1.70:8080/auth/`,
            userData);
        return res.data;
    }
}