const defaultState = () => {
	return {
		token: null,
		role: null,
	};
};

export let utils = {
	namespaced: true,
	state: defaultState(),
	mutations: {
		SET_TOKEN(state, data) {
			state.token = data;
		},
		SET_ROLE(state, data) {
			state.role = data;
		},
	},
	actions: {
		getToken({commit}) {
			commit('SET_TOKEN', localStorage.getItem('user_ff'))
		},
		getRole({commit}) {
			commit('SET_ROLE', localStorage.getItem('role_ff'))
		}
	},
};
