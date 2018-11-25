import axios from 'axios';

const apiController = {
    add_user: userData => { return axios.post('/api/users/create', userData); },
    find_user: userData => { return axios.post('/api/users/login', userData); },
    check_user: () => { return axios.get('/api/users/user'); },
    logout: () => { return axios.post('/api/users/logout'); },
    create_tournament: tourneyData => { return axios.post('/api/tournament/create', tourneyData); },
    show_recent: () => { return axios.get('/api/tournament/recent'); },
    show_one: (owner, id) => { return axios.post(`/api/tournament/join/${owner}/${id}`) },
    join_tournament: userTourney => { return axios.post('/api/tournament/join_tournament', userTourney) },
    // get_users_tournament: id => { return axios.post('/api/tournament/getusers', id) } 
};

export default apiController;