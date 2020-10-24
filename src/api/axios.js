import axios from 'axios';
import store from '@/store';
import config from './config';

class Service {
	constructor() {
		let service = axios.create({
			baseURL: 'https://hr-itmo.herokuapp.com/api/',
			timeout: 15000,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		localStorage.getItem('user_ff') || null
			? (service.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('user_ff')}`)
			: delete service.defaults.headers.common['Authorization'];
		
		service.interceptors.response.use(this.handleSuccess, (error) => this.handleError(error));
		this.service = service;
	}

	handleSuccess(response) {
		store.commit('processes/LOADING_STOP');
		return response;
	}

	handleError = (error) => {
		config.errorHandler(error);
		return Promise.reject(error);
	};

	get(url, query) {
		return this.service(url, { params: query });
	}

	put(url, data, file) {
		store.commit('processes/LOADING_START');
		return this.service.request({
			method: 'PUT',
			url,
			data,
			headers: { 'Content-Type': file ? 'multipart/form-data' : 'application/json' },
		});
	}

	post(url, data, file = false) {
		store.commit('processes/LOADING_START');
		return this.service({
			method: 'post',
			url,
			data,
			headers: { 'Content-Type': file ? 'multipart/form-data' : 'application/json' },
		});
	}
}

export default new Service();
