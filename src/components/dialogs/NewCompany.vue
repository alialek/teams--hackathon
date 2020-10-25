<template>
	<v-card class="pt-8">
		<v-card-text max-height="50vh">
			<v-form>
				<v-text-field
					:rules="[rules.required]"
					prepend-inner-icon="mdi-card-account-details"
					label="Название компании"
					v-model="company.name"
					outlined
				></v-text-field>
				<v-textarea outlined label="Описание" v-model="company.description"> </v-textarea>
				<v-combobox
					:items="cities"
					outlined
					item-text="name"
					item-value="id"
					label="Выберите город"
					v-model="company.city"
				></v-combobox>
				<v-text-field
					:rules="[rules.required]"
					prepend-inner-icon="mdi-card-account-details"
					label="ИНН"
					v-model="company.inn"
					outlined
				></v-text-field>

				<v-text-field
					:rules="[rules.required]"
					prepend-inner-icon="mdi-card-account-details"
					label="ОГРН"
					v-model="company.ogrn"
					outlined
				></v-text-field>
				<v-text-field
					:rules="[rules.required]"
					prepend-inner-icon="mdi-card-account-details"
					label="Адрес"
					v-model="company.address"
					outlined
				></v-text-field>
				<v-text-field
					:rules="[rules.required]"
					prepend-inner-icon="mdi-card-account-details"
					label="Номер телефона"
					v-model="company.phone"
					outlined
				></v-text-field>

				<v-file-input
					@change="Preview_image"
					outlined
					label="Логотип"
					placholder="PNG, JPG 256x256"
					v-model="company.logo"
				>
				</v-file-input>
				<v-img
					:style="
						`width:100px;height: 100px; background-size: contain; background-image: url(${company.logo});`
					"
				></v-img>
				<v-checkbox v-model="company.takes_on_practice">
					<template v-slot:label>
						Готовы предоставить практику
					</template>
				</v-checkbox>
				<v-btn
				
					color="primary"
					@click="sendCompany"
					large
					block
					elevation="0"
					full-width
				>
					Зарегистрироваться
				</v-btn>
			</v-form></v-card-text
		>
	</v-card>
</template>

<script>
	import { cities, createCompany } from '../../api';
	export default {
		name: 'NewCompany',
		data() {
			return {
        	rules: {
					required: (value) => !!value || 'Обязательное поле',
					min: (v) => v.length >= 8 || 'Минимум 8 символов',
				},

				cities: [],
				company: {
					logo: '',
					phone: '+79117653927',
					inn: '23423423',
					name: 'Selectel',
					ogrn: '8273282828724',
					takes_on_practice: false,
					address: 'Цветочная ул., д.19',
					city: '',
					description: 'Сеть дата-центров',
				},
			};
		},
		methods: {
			toBase64(file) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = (error) => reject(error);
				});
			},
			async Preview_image(par) {
				this.company.logo = await this.toBase64(par);
			},
			sendCompany() {
				createCompany({ ...this.company, city: this.company.city.id }).then((res) => {
					this.$store.commit('processes/SET_SUCCESS', 'Компания создана!');
					this.$emit('done');
				});
			},
		},
		mounted() {
			cities().then((res) => (this.cities = res.data));
		},
	};
</script>

<style></style>
