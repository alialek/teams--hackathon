import axios from '../axios';

export const sendResponse = (data) => {
	return axios.post('/requests/', data);
};

export const putDecisionOnResponse = (id, data) => {
	return axios.put(`/requests/${id}/`, data);
};

export const getResponses = (id) => {
	return axios.get(`/requests/`);
};
