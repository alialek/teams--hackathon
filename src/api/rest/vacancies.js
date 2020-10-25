import axios from '../axios';


export const vacancies = (params) => {
	console.log(params)
	return axios.get('/vacancies/', params);
};

export const getVacancies = () => {
	return axios.get('/vacancies/');
};

export const postVacancy = (data, id = 0) => {
	return axios.post(id ? `/vacancies/?company=${id}` : '/vacancies/', data);
};


export const getVacancyById = (id) => {
	return axios.get(`/vacancies/${id}/`);
};
