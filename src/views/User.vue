<template>
	<div class="mx-4">
		<div style="margin-top: 100px;">
			<div v-if="user.first_name">
				<v-icon style="font-size: 56px;">mdi-account-circle</v-icon>
				<h1 class="vacancy__title" style="margin-top: 24px;">{{ user.first_name + ' ' + user.last_name }}</h1>
				<v-icon v-if="role === 'EMPLOYER'" class="ml-2" style="font-size: 20px;">mdi-check-circle</v-icon>
				<div>{{ user.is_confirmed ? 'Аккаунт подтвержден' : 'Студент' }}</div>
			</div>
		</div>
		<v-tabs style="margin-top: 32px;" color="#0068CC">
			<v-tab>
				<v-icon left>
					mdi-account
				</v-icon>
				Информация
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-lock
				</v-icon>
				Резюме
			</v-tab>
			<v-tab-item>
				<div class="mt-8">
					<v-autocomplete
						:value="Number(user.university_id)"
						:items="universities"
						:search-input.sync="search"
						hide-no-data
						hide-selected
						readonly
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
			<v-tab-item>
				<resume-viewer :resume="user.form" />
			</v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import TCard from '@/atoms/TCard.vue';
	import ResumeViewer from '@/components/ResumeViewer';
	import { profile, universities, specializations } from '../api';

	export default {
		components: { TCard, ResumeViewer },
		name: 'User',
		props: {
			id: {
				type: String,
			},
		},
		data() {
			return {
				universities: [],
				specializations: [],
				user: {},
				disabled: true,
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
			};
		},

		computed: {
			availableCourses() {
				return this.degrees.filter((d) => this.user.degree === d.id)[0].courses;
			},
			employer() {
				return this.$store.state.vacancies.user;
			},
		},
		mounted() {
			Promise.all([universities(), specializations()]).then((values) => {
				this.universities = values[0].data;
				this.specializations = values[1].data;
			});
			profile(this.id).then((res) => {
				this.user = res.data;
			});
		},
	};
</script>

<style></style>
