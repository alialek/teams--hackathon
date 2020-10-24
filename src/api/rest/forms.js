import axios from '../axios';
//Создание резюме
export const forms = (data) => {
	return axios.post(`/forms/`, data);
};
