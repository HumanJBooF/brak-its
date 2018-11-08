import axios from "axios";

export default {
    addUser: userData => {
        return axios.post("/api/users", userData);
    }
};