import { Routes } from '@angular/router';

import { CompanyListComponent } from './company/list/company-list.component';
import { CompanyFormComponent } from './company/form/company-form.component';
import { CompanyDetailComponent } from './company/detail/company-detail.component';
import { PersonListComponent } from './person/list/person-list.component';
import { PersonFormComponent } from './person/form/person-form.component';
import { PersonDetailComponent } from './person/detail/person-detail.component';

export const routes: Routes = [
	{ path: 'companies', component: CompanyListComponent },
	{ path: 'companies/create', component: CompanyFormComponent },
	{ path: 'companies/:id', component: CompanyDetailComponent },
	{ path: 'companies/:id/edit', component: CompanyFormComponent },

	{ path: 'persons', component: PersonListComponent },
	{ path: 'persons/create', component: PersonFormComponent },
	{ path: 'persons/:id', component: PersonDetailComponent },
	{ path: 'persons/:id/edit', component: PersonFormComponent },

	{ path: '', redirectTo: 'companies', pathMatch: 'full' },
];
