import axios from "axios";

const apiController = {
    add_user: userData => {
        return axios.post("/api/users/create", userData);
    },
    find_user: userData => {
        return axios.post("/api/users/login", userData);
    }
};

export default apiController;