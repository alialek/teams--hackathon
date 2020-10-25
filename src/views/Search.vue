<template>
	<div class="justify-center  d-row  ">
		<v-col styclass="main pd-unset justify-space-evenly ">
			<div style="margin-top: 48px; width: 90%;" class=" mx-auto main__search d-col pd-unset">
				<v-text-field
					v-model="searchField.search"
					style="width: 100%"
					cache-items
					class=" searchField"
					full-width
					flat
					@input="sendRequest"
					rounded
					append-icon="mdi-magnify"
					hide-no-data
					hide-details
					placeholder="Поиск вакансий"
					outlined
				></v-text-field>
				<v-row>
					<v-col cols="3">
						<v-combobox
							v-model="searchField.skills"
							:items="entries"
							:loading="isLoading"
							:search-input.sync="searchSkill"
							hide-no-data
							outlined
							rounded
							hide-selected
							item-text="text"
							item-value="id"
							small-chips
							placeholder="Навыки"
							prepend-inner-icon="mdi-database-search"
							return-object
						></v-combobox>
					</v-col>
					<v-col cols="3"
						><v-select
							small-chips
							rounded
							outlined
							item-text="name"
							item-value="id"
							v-model="searchField.employment_type"
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
							v-model="searchField.experience_type"
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
							v-model="searchField.schedule_type"
							:items="schedule_types"
							placeholder="Режим работы"
						>
						</v-select
					></v-col>
				</v-row>
			</div>

			<div class="d-col main__slide">
				<div v-if="!loading && vacancies.length" class="main__slides d-row justify-space-around">
					<t-card
						v-for="vacancy in vacancies"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.name"
						:company_id="vacancy.company_id"
						:company="vacancy.company_name"
						:description="vacancy.short_description"
						:logo="vacancy.company_logo"
						:skills="vacancy.skills"
					/>
				</div>
				<v-row v-if="loading" class="justify-center">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
				</v-row>
				<v-row v-if="!loading && vacancies.length === 0" class="justify-center align-center">
					<v-card elevation="0">
						<v-col style="text-align:center">
							<v-icon style="font-size: 60px; margin-top: 40px;">mdi-note-search-outline</v-icon>
							Какие-то сложные запросы у вас. <br />
							Попробуйте смягчить фильтры поиска.
						</v-col>
					</v-card>
				</v-row>
			</div>
		</v-col>
	</div>
</template>

<script>
	import TCard from '@/atoms/TCard.vue';
	import { skillset, vacancies } from '../api';
	export default {
		name: 'Main',
		components: { TCard },
		props: {
			text: {
				default: '',
			},
		},
		data() {
			return {
				entries: [],
				isLoading: false,
				searchSkill: '',
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
					skills: null,
				},
				select: null,
				vacancies: [],
			};
		},
		computed: {
			token() {
				return this.$store.state.utils.token;
			},
		},
		watch: {
			'searchField.skills'(val) {
				this.sendRequest();
			},
			'searchField.experience_type'(val) {
				this.sendRequest();
			},
			'searchField.search'(val) {
				if (val.length) this.sendRequest();
			},
			searchSkill(val) {
				if (val?.length < 2 || this.isLoading) return;

				this.isLoading = true;

				skillset({ text: val })
					.then((res) => {
						this.entries = res.data.items;
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => (this.isLoading = false));
			},
		},
		mounted() {
			
			if(this.text) {
				this.searchField.search = this.text;
				
			}
		},
		methods: {
			sendRequest() {
		
				let data = {
					text: this.searchField.search,
				};

				if(this.searchField.skills !== null) data.skill = this.searchField.skills.id;
				if(this.searchField.experience_type) data.experience_type = this.searchField.experience_type;
				
				this.getVacancies(data);
			},
			getVacancies(data) {
				console.log('sds')
				this.loading = true;
				vacancies(data)
					.then((res) => {
						this.vacancies = res.data;
						this.loading = false
					})
					.finally(() => (this.loading = false));
			},
		},
	};
</script>

<style lang="css"></style>
