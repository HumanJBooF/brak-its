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
    },
    create_tournament: tourneyData => {
        return axios.post('/api/tournament/create', tourneyData);
    }
};

export default apiController;