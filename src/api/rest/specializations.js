import axios from '../axios';

export const specializations = (data) => {
	return axios.get('/specializations/');
};
