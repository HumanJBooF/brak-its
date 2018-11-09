import axios from "axios";

const apiController = {
    add_user: userData => {
        return axios.post("/api/users", userData);
    }
};

export default apiController;