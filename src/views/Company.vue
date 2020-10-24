<template>
	<div class="mx-4">
		<div style="margin-top: 100px;">
			<v-img style="height: 56px; width: 56px;" :src="employer.url"></v-img>
			<h1 class="vacancy__title" style="margin-top: 24px;">{{ employer.title }}</h1>
			<v-icon v-if="verified" class="ml-2" style="font-size: 20px;">mdi-check-circle</v-icon>
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
				<v-row style="margin-top: 24px">
				<t-card
					v-for="vacancy in employer.vacancies"
					:key="vacancy.id"
					:id="vacancy.id"
					:title="vacancy.title"
					:company="vacancy.company"
					:description="vacancy.description"
					:logo="vacancy.logo"
				/>
				</v-row>
			</v-tab-item>
			<v-tab-item> </v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import TCard from '@/atoms/TCard.vue';
	export default {
		components: { TCard },
		name: 'Company',
		props: {
			id: {
				default: 1,
			},
		},
		computed: {
			employer() {
				return this.$store.state.vacancies.employer;
			},
		},
	};
</script>

<style></style>
