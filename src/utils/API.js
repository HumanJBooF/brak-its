import axios from "axios";

const apiController = {
    add_user: userData => {
        return axios.post("/api/users/create", userData);
    }
};

export default apiController;