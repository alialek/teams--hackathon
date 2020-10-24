<template>
	<div>
		<v-tabs style="margin-top: 32px;" color="#0068CC">
			<v-tab>
				<v-icon left>
					mdi-account
				</v-icon>
				Все вакансии
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-lock
				</v-icon>
				Создать вакансию
			</v-tab>
			<v-tab-item>
				<v-expansion-panels style="margin-top: 16px;" flat elevation="0">
					<v-expansion-panel flat elevation="0" v-for="(vacancy, i) in vacancies" :key="i">
						<v-expansion-panel-header elevation="0">
							{{ vacancy.name }}
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<span class="caption">Описание: {{ vacancy.short_description }} <br><router-link class="caption" :to="`vacancy?id=${vacancy.id}`"
								>Ссылка на вакансию</router-link
							></span>
							
							<v-list subheader>
								<div v-if="vacancy.responses">
									<v-subheader>Отклики</v-subheader>

									<v-list-item v-for="response in vacancy.responses" :key="response">
										<v-list-item-avatar>
											<v-icon>mdi-account</v-icon>
										</v-list-item-avatar>

										<v-list-item-content>
											<v-list-item-title>Иван Иванов</v-list-item-title>
										</v-list-item-content>

										<v-list-item-icon>
											<v-btn>
												Пригласить
											</v-btn>
										</v-list-item-icon>
									</v-list-item>
								</div>
								<div v-else>
									<p class="caption">Откликов еще нет</p>
								</div>
							</v-list>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
				<v-row style="margin-top: 24px">
					<t-card
						v-for="vacancy in vacancies"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.name"
						:company="vacancy.company.name"
						:company_id="vacancy.company.id"
						:description="vacancy.short_description"
						:logo="vacancy.company.logo"
						:verified="true"
						:skills="vacancy.skills"
					/>
				</v-row>
			</v-tab-item>
			<v-tab-item><create-vacancy /> </v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import CreateVacancy from './CreateVacancy';
	import TCard from '@/atoms/TCard.vue';
	import { vacancies } from '../api';

	export default {
		name: 'Employer',
		components: {
			CreateVacancy,
			TCard,
		},
		props: {
			user: {
				default: {},
			},
		},
		computed: {
			vacancies() {
				return this.$store.state.vacancies.vacancies;
			},
		},
		mounted() {
			vacancies().then((res) => {
				this.$store.commit('vacancies/setVacancies', res.data);
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
