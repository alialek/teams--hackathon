import store from '@/store';
import router from '@/router';

export function setToken(token) {
	localStorage.setItem('token', token);
}

export function getToken() {
	localStorage.getItem('token');
}


export const deleteToken = () => {
	localStorage.removeItem('token');
};

const errorHandler = (err) => {
	store.commit('processes/LOADING_STOP');
	let error;
	if (err.response) {
		switch (err.response.status) {
			case 401:
				error = 'Вы не авторизованы';
				delete service.defaults.headers.common['authorization'];
				redirectTo('/login');
				break;
			case 404:
				error = 'Упс, что-то не найдено';
				break;
			default:
				error = 'Ошибка 500';
				
				break;
		}
	}
	store.commit('processes/SET_ERROR', error);
};

const redirectTo = (path) => {
	router.push(path);
};

export default { setToken, redirectTo, errorHandler, deleteToken, getToken, setToken };
