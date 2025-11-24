import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { PersonType } from '../../models/person-type.enum';
import { Paginator } from '../../models/paginator.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApiErrorComponent } from '../../shared/api-error.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule, ApiErrorComponent, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './person-list.component.html',
  providers: [PersonService]
})
export class PersonListComponent implements OnInit {
  @Input() companyId?: number;
  onPageChange(event: any) {
    const nextPage = event.pageIndex + 1;
    let url = `${this.personService.apiUrl}?page=${nextPage}`;
    if (this.selectedType) {
      url += `&filters[type]=${encodeURIComponent(this.selectedType)}`;
    }
    this.loadPersons(url);
  }
  apiError: string | null = null;
  personTypes = Object.values(PersonType);
  selectedType: PersonType | '' = '';
  paginator?: Paginator<Person>;
  persons: Person[] = [];
  loading = false;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    console.log('PersonListComponent inicializado');
    this.loadPersons();
  }

  loadPersons(pageUrl?: string) {
    this.loading = true;
    this.apiError = null;
    console.log('Buscando pessoas...');
    let url = pageUrl || this.personService.apiUrl;
    const filters: string[] = [];
    if (this.companyId) {
      filters.push(`filters[company_id]=${this.companyId}`);
    }
    if (this.selectedType) {
      filters.push(`filters[type]=${encodeURIComponent(this.selectedType)}`);
    }
    if (filters.length) {
      url += (url.includes('?') ? '&' : '?') + filters.join('&');
    }
    this.personService.getAll(url).subscribe({
      next: (data: Paginator<Person>) => {
        console.log('Pessoas recebidas:', data);
        this.paginator = data;
        this.persons = data.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar pessoas:', err);
        this.apiError = err?.error?.message || 'Erro ao buscar pessoas.';
        this.loading = false;
      }
    });
  }

  onTypeFilterChange() {
    this.loadPersons();
  }


  viewPerson(id: number) {
    this.router.navigate(['/persons', id]);
  }

  editPerson(id: number) {
    this.router.navigate(['/persons', id, 'edit']);
  }

  deletePerson(id: number) {
    if (confirm('Deseja realmente deletar esta pessoa?')) {
      this.personService.delete(id).subscribe(() => {
        this.loadPersons();
      });
    }
  }

  createPerson() {
    this.router.navigate(['/persons/create']);
  }
}
