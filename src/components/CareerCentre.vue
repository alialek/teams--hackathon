<template>
	<div>
		<v-tabs style="margin-top: 32px;" color="#0068CC">
			<v-tab>
				<v-icon left>
					mdi-file
				</v-icon>
				Вакансии
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-account
				</v-icon>
				Пользователи
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-lock
				</v-icon>
				Создать вакансию
			</v-tab>
				<v-tab-item>
				<v-row style="margin-top: 24px">
					<t-card
						v-for="vacancy in user.vacancies"
						:key="vacancy.id"
						:id="vacancy.id"
						:title="vacancy.title"
						:company="vacancy.company"
						:description="vacancy.description"
						:logo="vacancy.logo"
					/>
				</v-row>
			</v-tab-item>
			<v-tab-item>
				<v-card-title>	Nutrition
			
				<v-spacer></v-spacer>
				<v-text-field
					v-model="searchUsers"
					append-icon="mdi-magnify"
					label="Поиск"
					single-line
					hide-details
				></v-text-field>
				</v-card-title>
				<v-data-table :headers="headersUsers" :items="itemsUsers" :search="searchUsers">
					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2" @click="editItem(item)">
							mdi-pencil
						</v-icon>
						<v-icon small @click="deleteItem(item)">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>
			</v-tab-item>
		
			<v-tab-item><create-vacancy /> </v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
	import CreateVacancy from './CreateVacancy';
	export default {
		name: 'CareerCentre',
		components: {
			CreateVacancy,
		},
		props: {
			user: {
				default: {},
			},
		},
		data() {
			return {
				searchUsers: '',
				headersUsers: [
					{
						text: 'Dessert (100g serving)',
						align: 'start',
						sortable: false,
						value: 'name',
					},
					{ text: 'Calories', value: 'calories' },
					{ text: 'Fat (g)', value: 'fat' },
					{ text: 'Carbs (g)', value: 'carbs' },
					{ text: 'Protein (g)', value: 'protein' },
					{ text: 'Iron (%)', value: 'iron' },
					{ text: 'Действия', value: 'actions' },
				],
				itemsUsers: [
					{
						name: 'Frozen Yogurt',
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0,
						iron: '1%',
					},
				],
			};
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
