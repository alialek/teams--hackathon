import axios from '../axios';

export const universities = (data) => {
	return axios.get('/universities/');
};
