<template>
	<div v-if="employer !== {}" class="mx-4">
		<div style="margin-top: 100px;">
			<v-img style="height: 56px; width: 56px;" :src="employer.logo"></v-img>
			<h1 class="vacancy__title" style="margin-top: 24px;">
				{{ employer.name }} <v-icon class="ml-2" style="font-size: 20px;">mdi-check-circle</v-icon>
			</h1>

			<div>{{ employer.description }}</div>
		</div>
		<v-tabs style="margin-top: 32px;" color="#0068CC">
			<v-tab>
				<v-icon left>
					mdi-account
				</v-icon>
				Вакансии
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-lock
				</v-icon>
				О компании
			</v-tab>
			<v-tab-item>
				<v-row v-if="employer.vacancies" style="margin-top: 24px">
					<t-card
						v-for="vacancy in employer.vacancies"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.name"
						:company="vacancy.company.name"
						:company_id="vacancy.company.id"
						:description="vacancy.short_description"
						:logo="vacancy.company.logo"
					/>
				</v-row>
				<v-row v-else class="justify-center">
					<v-col style="text-align:center">
						<div
						class="mx-auto mt-8"
							style="height: 48px;width: 48px; background-image: url(https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/118/loudly-crying-face_1f62d.png); background-size: contain"
						>
						
						</div>
						<span class="placeholder__text">Вакансий нет</span>
					</v-col>
				</v-row>
			</v-tab-item>
			<v-tab-item class="d-row justify-center">
				<div style="max-width: 800px" class="mt-8">
					<div>
						<span class="mb-2 vacancy__field">Адрес</span>
						<v-text-field outlined :value="employer.city.name + ', ' + employer.address"></v-text-field>
					</div>
					<div>
						<span class="mb-2 vacancy__field">HR-представитель</span>
						<v-text-field
							outlined
							:value="employer.hr.first_name + ' ' + employer.hr.last_name"
						></v-text-field>
					</div>
					<v-row class="pd-unset">
						<v-col cols="6">
							<span style="margin-top: unset" class="mb-2 vacancy__field">Email</span>
							<v-text-field outlined :value="employer.hr.email"></v-text-field>
						</v-col>
						<v-col cols="6">
							<span style="margin-top: unset" class="mb-2 vacancy__field">Телефон</span>
							<v-text-field outlined :value="employer.phone"></v-text-field>
						</v-col>
					</v-row>
					<v-row class="pd-unset">
						<v-col cols="6">
							<span style="margin-top: unset" class="mb-2 vacancy__field">ИНН</span>
							<v-text-field outlined :value="employer.inn"></v-text-field>
						</v-col>
						<v-col cols="6">
							<span style="margin-top: unset" class="mb-2 vacancy__field">ОГРН</span>
							<v-text-field outlined :value="employer.ogrn"></v-text-field>
						</v-col>
					</v-row>
				</div>
			</v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import TCard from '@/atoms/TCard.vue';
	import { company } from '../api';

	export default {
		components: { TCard },
		name: 'Company',
		props: {
			id: {
				default: 1,
			},
		},
		data() {
			return {
				employer: {},
			};
		},
		computed: {},
		mounted() {
			company(this.id).then((res) => {
				this.employer = res.data;
			});
		},
	};
</script>

<style></style>
