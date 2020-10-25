import { auth, getUserInfo } from './rest/auth';
import { universities } from './rest/universities';
import { specializations } from './rest/specializations';
import { registration } from './rest/users';
import { skillset } from './rest/skillset';
import { createCompany, company, getCompanies } from './rest/companies';
import { cities } from './rest/citites';
import { vacancies, postVacancy, getVacancyById, getVacancies } from './rest/vacancies';
import { profile } from './rest/profile';
import { forms, createUserResume } from './rest/forms';
import { putDecisionOnResponse, sendResponse, getResponses } from './rest/requests';
import { getUsers } from './rest/students';
import { getMetrics } from './rest/metrics';

export {
	skillset,
	forms,
	company,
	createUserResume,
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
	getUsers,
	getVacancies,
getMetrics,
	getCompanies,
	specializations,
};
