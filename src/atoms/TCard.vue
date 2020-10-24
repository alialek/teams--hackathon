<template>
	<div class="ma-2">
		<v-card class="team-card" flat>
			<v-col class="squared__col pd-unset justify-space-around">
				<div class="justify-space-between d-row team-card__info">
					<div class="team-card__logo" :style="{ backgroundImage: `url(${logo})` }"></div>
					<div v-if="external" class="team-card__external">hh.ru</div>
				</div>
				<div>
					<router-link :to="`/vacancy?id=${id}`">
						<h4 class="team-card__title">{{ title }}</h4></router-link
					>
					<router-link :to="`/company?id=${company_id}`">
						<p class="team-card__company">
							{{ company }} <v-icon v-if="verified" style="font-size: 20px;">mdi-check-circle</v-icon>
						</p></router-link
					>
				</div>
				<router-link :to="`/vacancy?id=${id}`">
					<div>
						<p class="team-card__caption">
							{{ description }}
						</p>
					</div>
				</router-link>
				<v-row >
					<div :key="skill.id"  v-for="skill in skills" class="mr-2 ml-2 custom-chip">
						{{ skill.text }}
					</div>
				</v-row>
			</v-col>
		</v-card>
	</div>
</template>

<script>
	import './TCard.css';
	export default {
		props: {
			logo: String,
			link: String,
			title: String,
			company: Object,
			tags: Array,
			description: String,
			id: Number,
			skills: Array,
			verified: {
				default: false,
				type: Boolean,
			},
			external: {
				default: false,
			},
		},
		name: 'TCard',
	};
</script>
<style lang="css">
	.team-card {
		border: 1px solid #dddddd !important;
		height: 100%;
	}
	.team-card:hover {
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12) !important;
	}

	.team-card__external {
		background: rgba(0, 130, 255, 0.12);
		border-radius: 24px;
		font-family: Noto Sans;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 19px;
		text-align: center;
		letter-spacing: 0.25px;
		color: #0068cc;
		padding: 6px 12px;
		height: 30px;
	}

	.custom-chip {
		border: 1px solid #dddddd;
		box-sizing: border-box;
		border-radius: 100px;
		font-family: Noto Sans;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 20px;
		/* identical to box height, or 143% */

		letter-spacing: 0.25px;

		/* Black — Medium Emphasis */

		color: rgba(0, 0, 0, 0.6);
		mix-blend-mode: normal;
		padding: 4px 8px;
		height: fit-content;
		white-space: nowrap;

    overflow: hidden;
    width: fit-content;
    margin-top: 8px;
	}
</style>
