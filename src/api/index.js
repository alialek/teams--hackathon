import { auth, getUserInfo } from './rest/auth';
import { universities } from './rest/universities';
import { specializations } from './rest/specializations';
import { registration } from './rest/users';
import { skillset } from './rest/skillset';
import { createCompany } from './rest/companies';
import { cities } from './rest/citites';
import { vacancies, postVacancy, getVacancyById } from './rest/vacancies';
import { profile } from './rest/profile';
import { forms } from './rest/forms';
import { putDecisionOnResponse, sendResponse, getResponses } from './rest/requests';

export {
	skillset,
	forms,
	profile,
	getVacancyById,
	registration,
	getUserInfo,
	putDecisionOnResponse,
	sendResponse,
	getResponses,
	vacancies,
	cities,
	createCompany,
	auth,
	postVacancy,
	universities,
	specializations,
};
