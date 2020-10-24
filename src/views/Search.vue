<template>
	<div class="justify-center  d-row  ">
		<v-col styclass="main pd-unset justify-space-evenly ">
			<div style="margin-top: 48px; width: 90%;" class=" mx-auto main__search d-col pd-unset">
				<v-text-field
					v-model="select"
					style="width: 100%"
					:search-input.sync="searchField.search"
					cache-items
					class=" searchField"
					full-width
					flat
					rounded
					append-icon="mdi-magnify"
					hide-no-data
					hide-details
					placeholder="Поиск вакансий"
					outlined
				></v-text-field>
				<v-row>
					<v-col cols="3"
						><v-select
							small-chips
							rounded
							outlined
							item-text="name"
							item-value="id"
							v-model="search.employment_type"
							:items="employment_types"
							placeholder="Тип занятости"
						>
						</v-select
					></v-col>
					<v-col cols="3"
						><v-select
							small-chips
							item-text="name"
							item-value="id"
							rounded
							outlined
							v-model="search.experience_type"
							:items="experience_types"
							placeholder="Опыт"
						>
						</v-select
					></v-col>
					<v-col cols="3"
						><v-select
							small-chips
							item-text="name"
							item-value="id"
							rounded
							outlined
							v-model="search.schedule_type"
							:items="schedule_types"
							placeholder="Режим работы"
						>
						</v-select
					></v-col>
				</v-row>
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
		props: {
			search: {
				default: '',
			},
		},
		data() {
			return {
				experience_types: [
					{
						id: 1,
						name: 'Опыт не требуется',
					},
					{
						id: 2,
						name: 'Опыт от 1 года',
					},
					{
						id: 3,
						name: 'Опыт 3+ лет',
					},
					{
						id: 4,
						name: 'Опыт 5+ лет',
					},
				],
				employment_types: [
					{
						id: 1,
						name: 'Полная',
					},
					{
						id: 2,
						name: 'Частичная',
					},
					{
						id: 3,
						name: 'Стажировка',
					},
					{
						id: 4,
						name: 'Практика',
					},
				],
				schedule_types: [
					{
						id: 1,
						name: 'Полный день',
					},
					{
						id: 2,
						name: 'Гибкий график',
					},
					{
						id: 3,
						name: 'Удаленочка',
					},
				],
				loading: false,
				items: [],
				searchField: {
					search: '',
					experience_type: '',
					schedule_type: '',
					employment_type: '',
				},
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
		mounted() {
			this.searchField.search = this.search;
		},
		methods: {
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
