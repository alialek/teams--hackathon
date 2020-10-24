import axios from '../axios';

export const registration = (data) => {
	axios.post('/registration', data);
};
