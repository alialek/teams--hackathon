import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Cabinet from '../views/Cabinet.vue';
import Vacancy from '../views/Vacancy.vue';
import Company from '../views/Company.vue';
import Search from '../views/Search.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Главная',
		component: Home,
	},
	{
		path: '/auth',
		name: 'Вход',
		component: Auth,
	},
	{
		path: '/cabinet',
		name: 'Личный кабинет',
		component: Cabinet,
		props: { role: localStorage.getItem('role_ff') },
	},
	{
		path: '/vacancy',
		name: 'Вакансия',
		component: Vacancy,
		props: (route) => ({ id: route.query.id }),
	},
	{
		path: '/company',
		name: 'Компания',
		component: Company,
		props: (route) => ({ id: route.query.id }),
	},
	{
		path: '/search',
		name: 'Поиск',
		component: Search,
		props: (route) => ({ text: route.query.text }),
	},
	{
		path: '/profile',
		name: 'Пользователь',
		component: User,
		props: (route) => ({ id: route.query.id }),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/auth"];
//   const authRequired = publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("utoken");

//   if (authRequired && !loggedIn) {
//     return next("/auth");
//   }

//   next();
// });

export default router;
