import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiErrorComponent } from '../../shared/api-error.component';
import { PersonListComponent } from '../../person/list/person-list.component';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, ApiErrorComponent, PersonListComponent],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent implements OnInit {
  company?: Company;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit() {
    console.log('CompanyDetailComponent inicializado');
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log('ID da empresa recebido:', id);
      if (id) {
        this.loading = true;
        console.log('Buscando dados da empresa na API...');
        this.companyService.getById(id).subscribe({
          next: (data) => {
            console.log('Dados da empresa recebidos:', data);
            this.company = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar empresa:', err);
            this.error = err?.error?.message || 'Erro ao buscar empresa.';
            this.loading = false;
          }
        });
      } else {
        console.error('ID da empresa não informado.');
        this.error = 'ID da empresa não informado.';
      }
    });
  }
}
