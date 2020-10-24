import axios from '../axios';

export const registration = (data) => {
	return axios.post('/users/', data);
};
