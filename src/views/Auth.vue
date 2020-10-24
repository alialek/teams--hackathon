<template>
	<v-row class="pd-unset d-row auth">
		<v-col class="d-col col-12 col-sm-12 col-md-6 pd-unset justify-center align-center auth__col">
			<!-- <h1 class="text-h2 auth__logo font-weight-black">
				F<span class="text-h4 font-weight-black">ind</span>F<span class="text-h4 font-weight-black">ound</span>
			</h1> -->
			<v-window v-model="step">
				<v-window-item :value="1">
					<v-card elevation="0" class="auth__card pa-8">
						<h1 class="text-h4 text-center font-weight-black mb-4">Вход</h1>
						<v-form>
							<v-text-field
								autocomplete="email"
								prepend-inner-icon="mdi-email"
								label="Email"
								class="mt-8"
								v-model="login.email"
								outlined
							></v-text-field>
							<v-text-field
								label="Пароль"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show1 ? 'text' : 'password'"
								@click:append="show1 = !show1"
								prepend-inner-icon="mdi-key"
								autocomplete="current-password"
								v-model="login.password"
								outlined
							></v-text-field>
							<v-btn color="primary" @click="authenticate" large block elevation="0" full-width>
								Войти
							</v-btn>
						</v-form>
						<a class="mt-8 link text-center d-block" @click="step++">Зарегистрироваться</a>
					</v-card>
				</v-window-item>
				<v-window-item :value="2">
					<v-card elevation="0" class="auth__card pa-8">
						<div class="d-row justify-space-between align-baseline">
							<v-icon @click="step--" class="auth__back-icon">mdi-arrow-left</v-icon>
							<h1 class="text-h4 text-center d-block font-weight-black mb-4">Регистрация</h1>
							<div></div>
						</div>
						<span class="mb-2 d-block">Представьтесь, пожалуйста</span>
						<v-form сlass="mt-8">
							<v-select
								autocomplete="false"
								outlined
								item-value="id"
								item-text="value"
								:items="roles"
								v-model="registration.type"
								label="Роль пользователя"
								prepend-inner-icon="mdi-account"
							></v-select>
							<div class="d-row justify-end mt-6">
								<v-btn
									color="primary"
									:disabled="registration.type === ''"
									@click="step++"
									outlined
									elevation="0"
								>
									Далее<v-icon>mdi-arrow-right</v-icon>
								</v-btn>
							</div></v-form
						></v-card
					>
				</v-window-item>
				<v-window-item :value="3">
					<v-card elevation="0" class="auth__card pa-8">
						<div class="d-row justify-space-between align-baseline">
							<v-icon @click="step--" class="auth__back-icon">mdi-arrow-left</v-icon>
							<h1 class="text-h4 text-center d-block font-weight-black mb-4">Регистрация</h1>
							<div></div>
						</div>

						<v-form сlass="mt-8">
							<v-text-field
								autocomplete="false"
								outlined
								v-model="registration.first_name"
								label="Имя"
								prepend-inner-icon="mdi-account"
							></v-text-field>
							<v-text-field
								autocomplete="false"
								outlined
								v-model="registration.last_name"
								label="Фамилия"
								prepend-inner-icon="mdi-account"
							></v-text-field>
							<v-text-field
								autocomplete="email"
								prepend-inner-icon="mdi-email"
								label="Email"
								v-model="registration.email"
								outlined
							></v-text-field>

							<v-text-field
								autocomplete="current-password"
								outlined
								v-model="registration.password"
								label="Пароль"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required, rules.min]"
								:type="show1 ? 'text' : 'password'"
								@click:append="show1 = !show1"
								prepend-inner-icon="mdi-key"
							></v-text-field>
							<v-text-field
								autocomplete="current-password"
								outlined
								:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required, rules.min, passwordConfirmationRule]"
								:type="show2 ? 'text' : 'password'"
								v-model="registration.rePassword"
								label="Повторите пароль"
								@click:append="show2 = !show2"
								prepend-inner-icon="mdi-key"
							></v-text-field>
							Выберите пол
							<v-radio-group v-model="registration.sex">
								<v-radio value="MALE">
									<template v-slot:label>
										<div>Мужской</div>
									</template>
								</v-radio>
								<v-radio value="FEMALE">
									<template v-slot:label>
										<div>Женский</div>
									</template>
								</v-radio>
							</v-radio-group>
							Дата рождения
							<vc-date-picker class="pt-2" v-model="registration.date_of_birth"> </vc-date-picker>

							<div class="d-row justify-end mt-6">
								<v-btn
									@click="registration.type === 'STUDENT' ? (step = 4) : (step = 5)"
									color="primary"
									outlined
									elevation="0"
								>
									Далее<v-icon>mdi-arrow-right</v-icon>
								</v-btn>
							</div>
						</v-form>
					</v-card>
				</v-window-item>

				<v-window-item :value="4">
					<v-card elevation="0" class="auth__card pa-8">
						<div class="d-row justify-space-between align-baseline">
							<v-icon class="auth__back-icon" @click="step--">mdi-arrow-left</v-icon>
							<h1 class="text-h4 text-center d-block font-weight-black mb-4">Регистрация</h1>
							<div></div>
						</div>
						<v-form>
							<v-autocomplete
								ref="autocom"
								v-model="registration.university_id"
								:items="universities"
								:search-input.sync="search"
								:menu-props="{
									maxWidth: width,
									overflowX: false,
								}"
								hide-no-data
								hide-selected
								item-text="name"
								item-value="id"
								outlined
								:rules="[rules.required]"
								label="Университет"
								placeholder="Начните вводить название университета"
								prepend-inner-icon="mdi-domain"
							></v-autocomplete>
							<v-autocomplete
								v-model="registration.specialization"
								:items="specializations"
								:search-input.sync="search_spec"
								:menu-props="{
									maxWidth: width,
									overflowX: false,
								}"
								hide-no-data
								hide-selected
								:rules="[rules.required]"
								:item-text="concateText"
								item-value="id"
								outlined
								label="Направление подготовки"
								placeholder="Введите направление"
								prepend-inner-icon="mdi-school"
							></v-autocomplete>
							Ваш статус
							<v-radio-group :rules="[rules.required]" v-model="registration.student_id_type">
								<v-radio value="TAB">
									<template v-slot:label>
										<div>Студент</div>
									</template>
								</v-radio>
								<v-radio value="DIPLOMA">
									<template v-slot:label>
										<div>Выпусник</div>
									</template>
								</v-radio>
							</v-radio-group>
							<div v-if="registration.student_id_type === 'TAB'">
								<v-text-field
									:rules="[rules.required]"
									prepend-inner-icon="mdi-card-account-details"
									label="Табельный номер"
									v-model="registration.student_id"
									outlined
								></v-text-field>
								<div class="d-row">
									<v-col class="pd-unset " cols="6"
										><v-select
											:rules="[rules.required]"
											outlined
											:items="degrees"
											item-text="name"
											item-value="id"
											v-model="registration.degree"
											label="Степень"
										></v-select
									></v-col>
									<v-col class="pd-unset" cols="6">
										<v-select
											outlined
											:rules="[rules.required]"
											v-if="registration.degree"
											:items="availableCourses"
											v-model="registration.course"
											label="Курс"
										></v-select>
									</v-col>
								</div>
							</div>
							<v-text-field
								prepend-inner-icon="mdi-card-account-details"
								label="Номер диплома"
								v-if="registration.student_id_type === 'GRADUATE'"
								v-model="registration.student_id"
								:rules="[rules.required]"
								outlined
							></v-text-field>
							<v-btn
								:disabled="!isAvailable"
								color="primary"
								@click="register"
								large
								block
								elevation="0"
								full-width
							>
								Зарегистрироваться
							</v-btn>
						</v-form>
					</v-card>
				</v-window-item>
				<!--Регистрация студента КОНЕЦ -->
				<v-window-item :value="5">
					<v-card elevation="0" class="auth__card pa-8">
						<div class="d-row justify-space-between align-baseline">
							<v-icon class="auth__back-icon" @click="step--">mdi-arrow-left</v-icon>
							<h1 class="text-h4 text-center d-block font-weight-black mb-4">Регистрация</h1>
							<div></div>
						</div>
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
								:disabled="!isAvailableCompany"
								color="primary"
								@click="registerCompany"
								large
								block
								elevation="0"
								full-width
							>
								Зарегистрироваться
							</v-btn>
						</v-form>
					</v-card>
				</v-window-item>
			</v-window>
		</v-col>
		<v-col cols="6" class="d-col d-none d-sm-none d-md-flex pd-unset auth__image"> </v-col>
	</v-row>
</template>

<script>
	import './Auth.css';
	import { registration, createCompany, cities, universities, specializations, auth } from '@/api';
	import TCard from '../atoms/TCard';
	export default {
		name: 'Auth',
		components: {
			TCard,
		},
		data() {
			return {
				step: 1,
				show2: false,
				show1: false,
				menu2: false,
				search: '',
				company: {
					logo: '',
					phone: '+79117653927',
					inn: '23423423',
					name: 'ВКонтакте',
					ogrn: '8273282828724',
					takes_on_practice: false,
					address: 'Невский пр.,',
					city: '',
					description: 'Социальная сеть',
				},
				image: '',
				roles: [
					{ id: 'STUDENT', value: 'Я - студент' },
					{ id: 'EMPLOYER', value: 'Я - работодатель' },
				],
				cities: [],
				role: '',
				search_spec: '',
				width: 300,
				specializations: [],
				universities: [],
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

				registration: {
					type: '',
					password: '123123789',
					rePassword: '123123789',
					first_name: 'Александр',
					last_name: 'Алибутаев',
					degree: '',
					course: 0,
					sex: 'MALE',
					student_id: '',
					student_id_type: '',
					email: 'alialek@yandex.ru',
					university_id: 0,
					specialization: 0,
					date_of_birth: new Date(),
				},
				rules: {
					required: (value) => !!value || 'Обязательное поле',
					min: (v) => v.length >= 8 || 'Минимум 8 символов',
				},

				login: {
					email: '',
					password: '',
				},
			};
		},
		watch: {
			step: function(val) {
				this.show1 = false;
				this.show2 = false;
			},
		},

		computed: {
			isAvailable() {
				let result = false;
				if (this.step === 4)
					result = Object.keys(this.registration).reduce((acc, val) => {
						return (
							acc &&
							Boolean(this.registration.student_id_type === 'GRADUATE' ? true : this.registration[val])
						);
					}, true);

				return result;
			},
			isAvailableCompany() {
				let result = false;
				if (this.step === 5)
					result = Object.keys(this.company).reduce((acc, val) => {
						return acc && Boolean(val === 'takes_on_practice' ? true : this.company[val]);
					}, true);

				return result;
			},
			passwordConfirmationRule() {
				return () => this.password === this.rePassword || 'Пароли не совпадают';
			},
			availableCourses() {
				return this.degrees.filter((d) => this.registration.degree === d.id)[0].courses;
			},
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
			concateText: (item) => item.code + ' — ' + item.name,
			authenticate() {
				auth(this.login)
					.then((res) => {
						this.saveCreds(res);
						this.$router.push('/');
					})
					.catch((err) => {
						this.$store.commit('processes/SET_ERROR', 'Введенные данные неверны');
					});
			},
			registerCompany() {
				let data = Object.assign({}, this.registration);
				data.date_of_birth = `${this.registration.date_of_birth.getFullYear()}-${this.registration.date_of_birth.getMonth()}-${this.registration.date_of_birth.getDate()}`;
				delete data.rePassword;
				registration(data).then((res) => {
					this.saveCreds(res);
					createCompany({
						...this.company,
						email: this.registration.email,
						city: this.company.city.id,
					}).then((res) => {
						this.$store.commit('processes/SET_SUCCESS', 'Регистрация пройдена!');
						this.$router.push('/');
					});
				});
			},
			register() {
				let data = Object.assign({}, this.registration);
				data.date_of_birth = `${this.registration.date_of_birth.getFullYear()}-${this.registration.date_of_birth.getMonth()}-${this.registration.date_of_birth.getDate()}`;
				delete data.rePassword;
				registration(data).then((res) => {
					this.$store.commit('processes/SET_SUCCESS', 'Регистрация пройдена!');
					this.saveCreds(res);
					this.$router.push('/');
				});
			},
			saveCreds(res) {
				localStorage.setItem('user_ff', res.data.token);
				localStorage.setItem('role_ff', res.data.type);
			},
		},
		mounted() {
			Promise.all([universities(), specializations(), cities()]).then((values) => {
				this.universities = values[0].data;

				this.specializations = values[1].data;
				this.cities = values[2].data;
			});
			try {
				this.width = this.$refs.autocom.$el.getBoundingClientRect().width;
			} catch (err) {}
		},
	};
</script>

<style lang="css" scoped>
	.auth__card {
		border: 1px solid #dddddd;
	}
</style>
