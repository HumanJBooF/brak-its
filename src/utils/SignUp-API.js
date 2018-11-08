import axios from "axios";

const signUp_api = {
    addUser: () => {
        return axios.get("/api/signUp");
    }
}

export default signUp_api;