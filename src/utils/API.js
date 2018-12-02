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
    find_search: (search) => { return axios.post(`/api/tournament/search/${search}`); },
    get_users_tournament: id => { return axios.post('/api/tournament/getusers', id) },
    send_users_to_matches: userArr => { return axios.post('/api/tournament/setmatches', userArr) },
    get_users_for_matches: id => { return axios.post(`/api/tournament/matches/${id}`) }
};

export default apiController;