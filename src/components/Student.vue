<template>
	<div>
		<v-tabs style="margin-top: 32px;" color="#0068CC">
			<v-tab>
				<v-icon left>
					mdi-account
				</v-icon>
				Личная информация
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-file-account
				</v-icon>
				Резюме
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-eye
				</v-icon>
				Отклики
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-heart
				</v-icon>
				Компании
			</v-tab>
			<v-tab-item>
				<div class="mt-8">
					<v-autocomplete
						v-model="user.university_id"
						:items="universities"
						:search-input.sync="search"
						hide-no-data
						hide-selected
						item-text="name"
						item-value="id"
						outlined
						:readonly="disabled"
						label="Университет"
						placeholder="Начните вводить название университета"
						prepend-inner-icon="mdi-domain"
					></v-autocomplete>
					<v-autocomplete
						v-model="user.specialization"
						:items="specializations"
						hide-no-data
						hide-selected
						item-value="id"
						item-text="name"
						outlined
						:readonly="disabled"
						label="Направление подготовки"
						placeholder="Введите направление"
						prepend-inner-icon="mdi-school"
					></v-autocomplete>
					<v-text-field
						prepend-inner-icon="mdi-card-account-details"
						label="Табельный номер"
						:readonly="disabled"
						v-model="user.student_id"
						outlined
					></v-text-field>
					<div class="d-row">
						<v-col class="pd-unset " cols="6"
							><v-select
								outlined
								:readonly="disabled"
								:items="degrees"
								item-text="name"
								item-value="id"
								v-model="user.degree"
								label="Степень"
							></v-select
						></v-col>
						<v-col class="pd-unset" cols="6">
							<v-select
								:readonly="disabled"
								outlined
								:items="availableCourses"
								v-model="user.course"
								label="Курс"
							></v-select>
						</v-col>
					</div>
				</div>
			</v-tab-item>
			<v-tab-item><create-resume /> </v-tab-item>
			<v-tab-item>
				<v-row style="margin-top: 24px">
					<t-card
						v-for="vacancy in responses"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.title"
						:company="vacancy.company"
						:description="vacancy.description"
						:logo="vacancy.logo"
					/>
				</v-row>
			</v-tab-item>
			<v-tab-item>Сохраненные</v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import CreateResume from './CreateResume';
	import { registration, createCompany, cities, universities, specializations, auth, getResponses } from '@/api';

	import TCard from '@/atoms/TCard.vue';
	export default {
		name: 'Student',
		components: {
			CreateResume,
			TCard,
		},
		data() {
			return {
				degrees: [
					{
						id: 'BACHELOR',
						name: 'Бакалавр',
						courses: [1, 2, 3, 4, 5],
					},
					{
						id: 'MASTER',
						name: 'Магистр',
						courses: [1, 2],
					},
				],
				search: '',
				disabled: true,
				responses: []
			};
		},
		computed: {
			availableCourses() {
				return this.degrees.filter((d) => this.user.degree === d.id)[0].courses;
			},
		},
		props: {
			specializations: [],
			cities: [],
			universities: [],
			user: {
				default: {},
			},
		},
		mounted() {
			Promise.all([universities(), specializations(), cities(), getResponses()]).then((values) => {
				this.universities = values[0].data;

				this.specializations = values[1].data;
				this.cities = values[2].data;
				this.responses = values[3].data
			});
		},
	};
</script>

<style scoped>
	.editorx_body {
		border: 1px solid #ddd;
		padding: 8px 16px;
		border-radius: 10px;
	}
</style>
