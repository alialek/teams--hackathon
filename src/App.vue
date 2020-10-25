<template>
	<v-app>
		<v-app-bar
			v-if="isAppBarHidden"
			absolute
			color="white"
			style=" box-shadow: inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), inset 0px -0.5px 0px #B7B4B7, inset 0px -1px 0px rgba(183, 180, 183, 0.3) !important;"
			elevate-on-scroll
			scroll-target="#scrolling-techniques-7"
		>
			<router-link style="text-decoration: none; color: black" to="/"
				><v-toolbar-title class="logo-font" style="font-size: 34px !important; font-weight: 700"
					>FindFound</v-toolbar-title
				></router-link
			>
			<v-form @submit="$router.push(`/search?text=${text}`)">
				<v-text-field
					v-if="this.$route.name !== 'Поиск'"
					hide-details
					class="ml-10"
					dense
					outlined
					v-model="text"
					rounded
					prepend-inner-icon="mdi-magnify"
					single-line
				></v-text-field>
			</v-form>

			<v-spacer></v-spacer>

			<span class="vacancy__field my-auto mr-4">{{
				role === 'STUDENT' ? 'СТУДЕНТ' : role === 'EMPLOYER' ? 'КОМПАНИЯ' : 'ЦЕНТР КАРЬЕРЫ'
			}}</span>
			<v-menu v-if="token" offset-y>
				<template v-slot:activator="{ on, attrs }"
					><v-icon v-on="on" style="font-size: 32px;">mdi-account-circle-outline</v-icon>
				</template>
				<v-list>
					<v-list-item to="/cabinet">
						<v-list-item-title>Личный кабинет</v-list-item-title>
					</v-list-item>
					<v-list-item color="error" @click="logout">
						<v-list-item-title>Выйти</v-list-item-title>
					</v-list-item>
				</v-list></v-menu
			>
		</v-app-bar>
		<v-snackbar v-model="snackbar.enabled" :timeout="3000">
			{{ snackbar.text }}
			<template v-slot:action="{ attrs }">
				<v-btn color="primary" text v-bind="attrs" @click="snackbar.enabled = false">
					Закрыть
				</v-btn>
			</template>
		</v-snackbar>
		<router-view :style="{ marginTop: isAppBarHidden ? '64px' : '' }" />
	</v-app>
</template>

<script>
	import { vacancies } from './api';
	import './App.css';

	export default {
		name: 'App',

		data: () => ({
			text: '',
		}),
		mounted() {
			this.$store.dispatch('utils/getToken');
			this.$store.dispatch('utils/getRole');
		},
		computed: {
			token() {
				return this.$store.state.utils.token;
			},
			role() {
				return this.$store.state.utils.role;
			},
			snackbar() {
				return this.$store.state.processes.snack;
			},
			isAppBarHidden() {
				console.log(this.isEror);
				const publicRoutes = ['Главная', 'Вход'];
				return !publicRoutes.includes(this.$route.name);
			},
		},
		methods: {
			logout() {
				localStorage.removeItem('user_ff');
				localStorage.removeItem('role_ff');
				this.$router.push('/auth');
				document.location.reload();
			},
		},
		created() {
		
		},
	};
</script>
<style lang="css"></style>
