<template>
	<div class="justify-center p-relative mx-3 d-row  home">
		<v-menu v-if="token" offset-y>
			<template v-slot:activator="{ on, attrs }"
				><v-icon v-on="on" class="p-absolute" style="top: 16px; right: 16px; font-size: 32px;"
					>mdi-account-circle-outline</v-icon
				>
			</template>
			<v-list>
				<v-list-item to="/cabinet">
					<v-list-item-title >Личный кабинет</v-list-item-title>
				</v-list-item>
				<v-list-item color="error" @click="logout">
					<v-list-item-title  >Выйти</v-list-item-title>
				</v-list-item>
			</v-list></v-menu
		>

		<v-btn class="p-absolute" style="top: 16px; right: 16px; " v-else to="/auth" depressed text>Вход</v-btn>

		<v-col class="main pd-unset justify-space-evenly ">
			<div class="main__search d-col pd-unset">
				<h1 align="center" class=" my-9 logo-font">FindFound</h1>
				<v-form @submit="$router.push(`search?text=${search}`)">
					<v-autocomplete
						v-model="select"
						:items="items"
						:search-input.sync="search"
						cache-items
						class="mx-auto search"
						flat
						rounded
						hide-no-data
						hide-details
						placeholder="Поиск вакансий"
						outlined
					></v-autocomplete>
				</v-form>
			</div>
			<div class="d-col main__slide">
				<div class="main__slides d-row">
					<t-card
						v-for="vacancy in vacancies"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.title"
						:company="vacancy.company"
						:description="vacancy.description"
						:logo="vacancy.logo"
					/>
				</div>
			</div>
		</v-col>
	</div>
</template>

<script>
	import TCard from '@/atoms/TCard.vue';
	export default {
		name: 'Main',
		components: { TCard },
		data() {
			return {
				loading: false,
				items: [],
				search: null,
				select: null,
				states: ['Frontend', 'Backend', 'Маркетинг', 'UX', 'Дизайн', 'Аналитика'],
			};
		},
		computed: {
			vacancies() {
				return this.$store.state.vacancies.random;
			},
			token() {
				return this.$store.state.utils.token;
			},
		},
		watch: {
			search(val) {
				val && val !== this.select && this.querySelections(val);
			},
		},
		methods: {
			logout() {
				localStorage.removeItem('user_ff');
				localStorage.removeItem('role_ff');
				document.location.reload();
			},
			querySelections(v) {
				this.loading = true;
				// Simulated ajax query
				setTimeout(() => {
					this.items = this.states.filter((e) => {
						return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1;
					});
					this.loading = false;
				}, 500);
			},
		},
	};
</script>

<style lang="css"></style>
