import axios from '../axios';

export const profile = (id) => {
	return axios.get(`/profile/${id}/`);
};
