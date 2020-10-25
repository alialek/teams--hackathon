import axios from '../axios';

export const getMetrics = () => {
	return axios.get(`/metrics/`);
};
