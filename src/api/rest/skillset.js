import axios from 'axios';

export const skillset = (params) => {
	return axios('https://api.hh.ru/suggests/skill_set', { params });
};
