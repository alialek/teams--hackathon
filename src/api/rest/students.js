import axios from '../axios';

export const getUsers = (data) => {
	return axios.get('/students/');
};


