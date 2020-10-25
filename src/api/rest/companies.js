import axios from '../axios';

export const createCompany = (data) => {
	return axios.post('/companies/', data);
};

export const company = (id) => {
	return axios.get(`/companies/${id}/`);
};

export const getCompanies = (id) => {
	return axios.get(`/companies/`);
};