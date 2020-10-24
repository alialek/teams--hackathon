import axios from '../axios';

export const auth = ({email, password}) => {
	return axios.post('/auth/', {email, password});
};

export const getUserInfo = () => {
	return axios.get('/auth/');
};
