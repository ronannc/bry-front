import { Routes } from '@angular/router';

import { CompanyListComponent } from './screens/company/list/company-list.component';
import { CompanyFormComponent } from './screens/company/form/company-form.component';
import { CompanyDetailComponent } from './screens/company/detail/company-detail.component';
import { PersonListComponent } from './screens/person/list/person-list.component';
import { PersonFormComponent } from './screens/person/form/person-form.component';
import { PersonDetailComponent } from './screens/person/detail/person-detail.component';

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
