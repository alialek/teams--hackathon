import axios from '../axios';
//Создание резюме
export const forms = (data) => {
	return axios.post(`/forms/`, data);
};

export const createUserResume = (data, id) => {
	return axios.post(`/forms/?student=${id}`, data);
};
