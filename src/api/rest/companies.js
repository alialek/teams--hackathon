import axios from '../axios';

export const createCompany = (data) => {
	return axios.post('/companies/', data);
};
