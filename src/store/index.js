import Vue from 'vue';
import Vuex from 'vuex';
import { processes } from './modules/processes';
import { vacancies } from './modules/vacancies';
import { utils } from './modules/utils';
import { user } from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		processes,
		vacancies,
		utils,
		user,
	},
});
