import axios from '../axios';

export const cities = (data) => {
	return axios.get('/cities/');
};
