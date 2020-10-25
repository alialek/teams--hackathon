<template>
	<div class="d-row justify-center">
		<div class="mt-4">
			<v-col style="width:500px">
				<span class="mb-2 resume__field">Цель</span>

				<v-text-field outlined readonly v-model="resume.aim" placeholder="Цель" />

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
							readonly
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
							readonly
							multiple
							single-line
							:delimiters="[',']"
							label="Личные качества"
						>
							</v-combobox
						></v-col
					>
				</v-row>
				<span class="mb-2 resume__field"
					>Достижения</span
				>
				<div :key="i + 'a'" v-for="(achievement, i) in resume.achievements">
					<v-text-field readonly label="Достижение" v-model="resume.achievements[i]" outlined></v-text-field>
				</div>
				<span class="mb-2 resume__field"
					>Образование </span
				>
				<div :key="i + 'ed'" v-for="(education, i) in resume.educations">
					<v-row class="pd-unset">
						<v-col cols="12" style="padding-bottom: unset" class="col-md-6">
							<v-text-field
								outlined
								readonly
								label="Год начала обучения"
								v-model="education.started"
							/>
						</v-col>
						<v-col cols="12" style="padding-bottom: unset" class="col-md-6">
							<v-text-field
								outlined
								readonly
								label="Год выпуска"
								v-model="education.ended"
								:items="years"
							/>
						</v-col>
					</v-row>
					<v-combobox
						ref="autocom"
						v-model="education.university"
						:items="universities"
						:menu-props="{
							maxWidth: width,
							overflowX: false,
						}"
						hide-no-data
						hide-selected
						item-text="name"
						readonly
						item-value="id"
						outlined
						label="Университет"
						placeholder="Начните вводить название университета"
						prepend-inner-icon="mdi-domain"
					></v-combobox>
					<v-autocomplete
						v-model="education.specialization"
						:items="specializations"
						:search-input.sync="search_spec"
						hide-no-data
						hide-selected
						:item-text="concateText"
						item-value="id"
						outlined
						readonly
						label="Направление подготовки"
						placeholder="Введите направление"
						prepend-inner-icon="mdi-school"
					></v-autocomplete>
					<v-checkbox style="margin-top: unset" v-if="education.is_extra" v-model="education.is_extra">
						<template v-slot:label>
							Дополнительное образование
						</template>
					</v-checkbox>
					<v-divider class="my-4"></v-divider>
				</div>
				<span class="mb-2 resume__field"
					>Работа </span
				>
				<div :key="i + 'jobs'" v-for="(job, i) in resume.jobs">
					<v-text-field outlined label="Название компании" v-model="job.name"> </v-text-field>
				<v-text-field outlined label="Обязанности на работе" :value="job.duties.join('')" />
					
					<v-row class="pd-unset">
						<v-col cols="3" style="padding-bottom: unset; padding-top: unset" class="col-md-3">
							<span class="mb-2 resume__field">Начало</span>
						</v-col>
						<v-col
							v-if="!job.isActual"
							cols="3"
							style="padding-bottom: unset; padding-top: unset"
							class="col-md-3"
						>
							<span class="mb-2 resume__field">Конец</span>
						</v-col></v-row
					>
					<v-row class="pd-unset">
						<v-col cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-text-field outlined label="Начало" v-model="job.started" />
						</v-col>
		

						<v-col  cols="6" style="padding-bottom: unset" class="col-md-3">
							<v-text-field outlined label="Конец" v-model="job.ended" />
						</v-col>
						
					</v-row>
	
					<v-divider class="my-4"></v-divider>
				</div>
			</v-col>
		</div>
	</div>
</template>

<script>
	import { skillset, specializations, universities, forms } from '@/api';

	export default {
		name: 'ResumeViewer',
		props: {
			resume: {
				default: {},
			},
		},
		data() {
			return {
				years: [],
				months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				specializations: [],
				entries: [],
				isLoading: false,
				search: '',
				isLoading2: false,

				searchUni: '',

				width: 300,
				search_spec: '',
				universities: [],

				searchSoft: '',
			};
		},

		methods: {
			concateText: (item) => item.name + ' — ' + item.qualification,
		},
		mounted() {
			console.log(this.resume)
			specializations().then((res) => {
				this.specializations = res.data;
			});
			universities().then((res) => {
				this.universities = res.data;
			});

			for (let i = 2020; i >= 1960; i--) {
				this.years.push(i);
			}
		},
	};
</script>

<style scoped>
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
