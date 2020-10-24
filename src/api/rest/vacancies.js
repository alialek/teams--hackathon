import axios from '../axios';

export const vacancies = (params) => {
	return axios.get('/vacancies/', { params });
};

export const postVacancy = (data) => {
	return axios.post('/vacancies/', data);
};

export const getVacancyById = (id) => {
	return axios.get(`/vacancies/${id}/`);
};
