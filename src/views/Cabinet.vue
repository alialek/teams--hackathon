<template>
	<div class="mx-4">
		<div v-if="role === 'EMPLOYER'" style="margin-top: 100px;">
			<v-img style="height: 56px; width: 56px;" :src="user.logo"></v-img>
			<h1 class="vacancy__title" style="margin-top: 24px;">{{ user.title || user.name }}</h1>
			<v-icon v-if="user.is_confirmed && role === 'EMPLOYER'" class="ml-2" style="font-size: 20px;"
				>mdi-check-circle</v-icon
			>
			<div>{{ user.description }}</div>
		</div>
		<div v-if="role === 'ADMINISTRATOR'" style="margin-top: 72px;">
			<div style="height: 96px; width: 96px; background-size: contain;background-image: url(https://upload.wikimedia.org/wikipedia/ru/2/2e/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A1%D0%9A%D0%A4%D0%A3.png)"></div>
			<h1 class="vacancy__title" style="margin-top: 24px;">Центр карьеры</h1>
			<v-icon v-if="user.is_confirmed && role === 'EMPLOYER'" class="ml-2" style="font-size: 20px;"
				>mdi-check-circle</v-icon
			>
			<div>СКФУ</div>
		</div>
		<div v-if="role === 'STUDENT'" style="margin-top: 100px;">
			<div v-if="user.first_name">
			<v-icon style="font-size: 56px;">mdi-account-circle</v-icon>
			<h1 class="vacancy__title" style="margin-top: 24px;">{{ user.first_name + ' ' + user.last_name }}</h1>
			<v-icon v-if=" role === 'EMPLOYER'" class="ml-2" style="font-size: 20px;"
				>mdi-check-circle</v-icon
			>
			<div>{{ user.is_confirmed ? 'Аккаунт подтвержден' : 'Студент' }}</div>
			</div>
			<div v-else>   <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular></div>
		</div>

		<div>
			<career-centre @refresh=getInfo :user="user" v-if="role === 'ADMINISTRATOR'" />
			<student  @refresh=getInfo :user="user" v-if="role === 'STUDENT'" />
			<employer @refresh=getInfo :user="user" v-if="role === 'EMPLOYER'" />
		</div>
	</div>
</template>

<script>
	import CareerCentre from '@/components/CareerCentre';
	import Student from '@/components/Student';
	import Employer from '@/components/Employer';
	import { getUserInfo } from '../api';

	export default {
		components: {
			CareerCentre,
			Student,
			Employer,
		},
		name: 'Cabinet',
		props: {
			role: {
				type: String,
			},
		},
		computed: {
			user() {
				return this.$store.state.user.info;
			},
		},
		methods: {
			getInfo() {
getUserInfo().then((res) => {
				this.$store.commit('user/setUser', res.data);
			});
			}
		},
		mounted() {
			if(this.role !== 'ADMINISTRATOR') this.getInfo()
		},
	};
</script>


</style>
