<template>
	<div class="d-row justify-center">
		<div class="mt-4">
			<v-col style="width:500px">
				<span class="mb-2 resume__field">Цель</span>

				<v-text-field outlined v-model="resume.aim" placeholder="Цель" />

				<span class="mb-2 resume__field">Навыки</span>
				<v-row class="pd-unset">
					<v-col cols="12">
						<v-combobox
							v-model="resume.extra_skills"
							:items="entries"
							:loading="isLoading"
							:search-input.sync="search"
							hide-no-data
							outlined
							hide-selected
							item-text="text"
							item-value="id"
							small-chips
							multiple
							single-line
							label="Дополнительные навыки"
							placeholder="Начните вводить, чтобы увидеть список "
							prepend-inner-icon="mdi-database-search"
							return-object
						></v-combobox>
						<v-combobox
							:search-input.sync="searchSoft"
							v-model="resume.soft_skills"
							outlined
							small-chips
							multiple
							single-line
							:delimiters="[',']"
							label="Личные качества"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>
											Начните вводить навыки через запятую
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</template></v-combobox
						></v-col
					>
				</v-row>
				<span class="mb-2 resume__field"
					>Достижения <v-icon @click="resume.achievements.push('')">mdi-plus</v-icon></span
				>
				<div :key="i + 'a'" v-for="(achievement, i) in resume.achievements">
					<v-text-field label="Достижение" v-model="resume.achievements[i]" outlined></v-text-field>
				</div>
				<span class="mb-2 resume__field"
					>Образование <v-icon @click="resume.educations.push(educationTmpl)">mdi-plus</v-icon></span
				>
				<div :key="i + 'ed'" v-for="(education, i) in resume.educations">
					<v-row class="pd-unset">
						<v-col cols="12" style="padding-bottom: unset" class="col-md-6">
							<v-select
								outlined
								label="Год начала обучения"
								v-model="education.start.year"
								:items="years"
							></v-select>
						</v-col>
						<v-col cols="12" style="padding-bottom: unset" class="col-md-6">
							<v-select
								outlined
								label="Год выпуска"
								v-model="education.end.year"
								:items="years"
							></v-select>
						</v-col>
					</v-row>
					<v-autocomplete
						ref="autocom"
						v-model="education.university"
						:items="universities"
						:search-input.sync="searchUni"
						:menu-props="{
							maxWidth: width,
							overflowX: false,
						}"
						hide-no-data
						hide-selected
						item-text="name"
						item-value="id"
						outlined
						label="Университет"
						placeholder="Начните вводить название университета"
						prepend-inner-icon="mdi-domain"
					></v-autocomplete>
					<v-autocomplete
						v-model="education.specialization"
						:items="specializations"
						:search-input.sync="search_spec"
						hide-no-data
						hide-selected
						:item-text="concateText"
						item-value="id"
						outlined
						label="Направление подготовки"
						placeholder="Введите направление"
						prepend-inner-icon="mdi-school"
					></v-autocomplete>
					<v-checkbox style="margin-top: unset" v-model="resume.extra">
						<template v-slot:label>
							Дополнительное образование
						</template>
					</v-checkbox>
					<v-divider class="my-4"></v-divider>
				</div>
				<span class="mb-2 resume__field"
					>Работа <v-icon @click="resume.jobs.push(jobsTmpl)">mdi-plus</v-icon></span
				>
				<div :key="i + 'jobs'" v-for="(job, i) in resume.jobs">
					<v-text-field outlined label="Название компании" v-model="job.name"> </v-text-field>
					<v-text-field outlined label="Обязанности на работе" v-model="job.duties"> </v-text-field>
					<v-row class="pd-unset">
						<v-col cols="6" style="padding-bottom: unset; padding-top: unset" class="col-md-6">
							<span class="mb-2 resume__field">Начало</span>
						</v-col>
						<v-col
							v-if="!job.isActual"
							cols="6"
							style="padding-bottom: unset; padding-top: unset"
							class="col-md-6"
						>
							<span class="mb-2 resume__field">Конец</span>
						</v-col></v-row
					>
					<v-row class="pd-unset">
						<v-col cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-select outlined label="Месяц" v-model="job.start.month" :items="months"></v-select>
						</v-col>
						<v-col cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-select outlined label="Год" v-model="job.start.year" :items="years"></v-select>
						</v-col>

						<v-col v-if="!job.isActual" cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-select outlined label="Месяц" v-model="job.end.month" :items="months"></v-select>
						</v-col>
						<v-col v-if="!job.isActual" cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-select outlined label="Год" v-model="job.end.year" :items="years"></v-select>
						</v-col>
					</v-row>
					<v-checkbox v-model="job.isActual">
						<template v-slot:label>
							По настоящее время
						</template>
					</v-checkbox>
					<v-divider class="my-4"></v-divider>
				</div>

				<v-btn depressed mt-8 @click="save">
					Сохранить
				</v-btn>
			</v-col>
		</div>
	</div>
</template>

<script>
	import { skillset, specializations, universities, forms } from '@/api';

	export default {
		name: 'Createresume',
		data() {
			return {
				years: [],
				months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				specializations: [],
				entries: [],
				isLoading: false,
				isLoading2: false,
				search: '',
				searchUni: '',
			
				width: 300,
				search_spec: '',
				universities: [],
				jobsTmpl: {
					start: {
						month: '',
						year: '',
					},
					end: {
						month: '',
						year: '',
					},
					isActual: false,
					name: 'Selectel',
					duties: 'Работа с контр-агентами',
				},
				educationTmpl: {
					start: {
						month: '',
						year: '',
					},
					end: {
						month: '',
						year: '',
					},
					university: '',
					specialization: '',
					is_extra: false,
				},
				searchSoft: '',
				resume: {
					aim: 'Трудоустройство',
					extra_skills: [],
					soft_skills: ['исполнительный', 'трудолюбивый'],
					achievements: ['Русский медвежонок 2009', 'Кенгуру 210'],
					jobs: [],
					educations: [],
					courses: []
				},
			};
		},
		watch: {
			search(val) {
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
		methods: {
			concateText: (item) => item.name + ' — ' + item.qualification,

			save() {
				let data = {
					...this.resume,
					jobs: this.resume.jobs.map((j) => {
						return {
							started: `${j.start.month}.${j.start.year}`,
							ended: j.isActual ? 'По настоящее время' : `${j.end.month}.${j.end.year}`, name: j.name, duties: j.duties
						};
					}),
				};
			},
		},
		mounted() {
			specializations().then((res) => {
				this.specializations = res.data;
			});
			universities().then((res) => {
				this.universities = res.data;
			});
			try {
				this.width = this.$refs.autocom.$el.getBoundingClientRect().width;
			} catch (err) {}
			this.resume.educations.push(this.educationTmpl);
			this.resume.jobs.push(this.jobsTmpl);
			
			for (let i = 1960; i <= 2020; i++) {
				this.years.push(i);
			}
		},
	};
</script>

<style scoped>
	.editorx_body {
		border: 1px solid #ddd;
		padding: 8px 16px;
		border-radius: 10px;
	}

	.resume__field {
		font-family: Noto Sans;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		margin-top: 0px;
		letter-spacing: 0.4px;

		color: #000000;

		mix-blend-mode: normal;
		opacity: 0.6;
	}
</style>
