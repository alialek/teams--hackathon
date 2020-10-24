import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
	font: {
		family: 'Noto Sans',
	},
	theme: {
		themes: {
			light: {
				primary: '#4c84ff',
				secondary: '#75d0a6',
				accent: '#fdc14e',
				error: '#FF5252',
				info: '#4c84ff',
				success: '#78c370',
				warning: '#FFC107',
			},
		},
	},
});
