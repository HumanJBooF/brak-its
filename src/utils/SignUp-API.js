import axios from "axios";

const signUp_api = {
    getSignUp: () => {
        return axios.get(/api/signUp);
    }
}

export default signUp_api;