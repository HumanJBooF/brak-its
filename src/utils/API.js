import axios from 'axios';

const apiController = {
    add_user: userData => {
        return axios.post('/api/users/create', userData);
    },
    find_user: userData => {
        return axios.post('/api/users/login', userData);
    },
    check_user: () => {
        return axios.get('/api/users/user');
    },
    logout: () => {
        return axios.post('/api/users/logout');
    }
};

export default apiController;