import axios from 'axios';

export default class ChatController {
    static async getChats(userID) {
        return axios.get(`http://localhost:8080/chat/by_client_id/${userID}`);
    }
}