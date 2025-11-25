import { Component, Input, OnInit } from '@angular/core';
import { CompanyListComponent } from '../../company/list/company-list.component';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiErrorComponent } from '../../../shared/api-error.component';
import { MatCardContent, MatCard } from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, CompanyListComponent, ApiErrorComponent, MatCardContent, MatCard],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {
  person?: Person;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loading = true;
        this.personService.getById(id).subscribe({
          next: (data) => {
            this.person = data;
            this.loading = false;
          },
          error: (err) => {
            this.error = err?.error?.message || 'Erro ao buscar pessoa.';
            this.loading = false;
          }
        });
      } else {
        this.error = 'ID da pessoa não informado.';
      }
    });
  }
}
