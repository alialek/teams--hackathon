<template>
	<div>
		<v-row v-if="!isLoading" class="vacancy">
			<v-col class="cols-12 px-10 cols-md-6">
				<h1 class="vacancy__title" style="margin-top: 100px;">{{ vacancy.name }}</h1>
				<div style="margin-top: 8px" class="d-row pd-unset align-center">
					<div
						:style="
							`height: 48px; width: 48px;background-size: contain; margin-right: 16px;background-image: url(${vacancy.company.logo})`
						"
					></div>
					<span class="vacancy__author">{{ vacancy.company.name }}</span>
					<v-icon v-if="verified" class="ml-2" style="font-size: 20px;">mdi-check-circle</v-icon>
				</div>
				<span class="vacancy__field">Краткое описание</span>
				<div style="margin-top: 24px;">{{ vacancy.short_description }}</div>
				<span class="vacancy__field">Описание</span>
				<div style="margin-top: 24px;"><Post-viewer :post="JSON.parse(vacancy.description)" /></div>
				<v-divider style="margin-top: 48px;"></v-divider>
				<div class="d-row align-center" style="margin-top: 24px;">
					<v-btn @click="response" depressed color="primary" rounded>Откликнуться</v-btn
					><v-btn depressed fab color="primary" class="ml-4" small><v-icon>mdi-heart-outline</v-icon></v-btn>
				</div>
			</v-col>
			<v-col class="cols-12 px-10 cols-md-6">
				<span class="vacancy__field">Заработная плата</span>
				<h2 class="vacancy__salary">{{ vacancy.salary }}₽</h2>
				<v-divider style="margin: 32px 0px"></v-divider>
				<span style="margin-top: 0px" class="vacancy__field">Адрес</span>
				<b style="margin-top: 16px;">{{ vacancy.company.city.name }}, {{ vacancy.company.address }}</b>
				<span class="vacancy__field">Навыки:</span>
				<div class="d-row" style="margin-top: 24px;">
					<div
						v-for="skill in vacancy.skills"
						style="margin-left: 8px"
						:key="skill.id"
						class="team-card__external"
					>
						{{ skill.text }}
					</div>
				</div>
				<span class="vacancy__field">Условия:</span>
				<div class="d-col" style="margin-top: 24px;">
					<div style="margin-top: 8px; width: fit-content" class="team-card__external">
						Опыт: {{ vacancy.experience_type.text }}
					</div>
					<div style="margin-top: 8px; width: fit-content" class="team-card__external">
						График: {{ vacancy.schedule_type.text }}
					</div>
					<div style="margin-top: 8px; width: fit-content" class="team-card__external">
						Занятость: {{ vacancy.employment_type.text }}
					</div>
				</div>
				<v-divider style="margin: 32px 0px"></v-divider>
				<span style="margin-top: 0px" class="vacancy__field">Контакты:</span>
				<span style="margin-top: 16px" class="font-weight-bold"
					><v-icon style="margin-right: 8px;">mdi-phone</v-icon>{{ vacancy.company.phone }}</span
				>
				<span style="margin-top: 16px" class="font-weight-bold"
					><v-icon style="margin-right: 8px;">mdi-email-open-outline</v-icon>{{ vacancy.company.email }}</span
				>
			</v-col>
		</v-row>
		<div v-else>
			<v-progress-circular></v-progress-circular>
		</div>
	</div>
</template>

<script>
	import PostViewer from '@/atoms/Post-viewer.vue';
	import { getVacancyById, sendResponse } from '../api';
	export default {
		name: 'Vacancy',
		components: {
			PostViewer,
		},
		props: {
			id: {
				default: 1,
			},
		},
		data() {
			return {
				isLoading: false,
			};
		},
		methods: {
			response() {
				sendResponse({ vacancy: this.id }).then(() => {
					this.$store.commit('processes/SET_SUCCESS', 'Отклик доставлен')
				})
			}
		},
		computed: {
			vacancy() {
				return this.$store.state.vacancies.vacancy;
			},
		},
		mounted() {
			this.isLoading = true;
			getVacancyById(this.id)
				.then((res) => {
					this.$store.commit('vacancies/setVacancy', res.data);
				})
				.finally(() => (this.isLoading = false));
		},
	};
</script>

<style>
	.vacancy__title {
		font-family: Gilroy;
		font-style: normal;
		font-weight: 600;
		font-size: 48px;
		line-height: 57px;
	}

	.vacancy__author {
		font-family: Noto Sans;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 16px;

		letter-spacing: 0.4px;
	}

	.vacancy__field {
		font-family: Noto Sans;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		/* identical to box height, or 114% */
		margin-top: 48px;
		letter-spacing: 0.4px;

		color: #000000;

		mix-blend-mode: normal;
		opacity: 0.6;
	}

	.vacancy__salary {
		font-family: Gilroy;
		font-style: normal;
		font-weight: 600;
		font-size: 48px;
		line-height: 57px;
		letter-spacing: 0.25px;
	}
</style>
