import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { Paginator } from '../../../models/paginator.model';
import { ApiErrorComponent } from "../../../shared/api-error.component";

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, ApiErrorComponent],
  templateUrl: './company-list.component.html',
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
  @Input() personId?: number;
  apiError: string | null = null;
  paginator?: Paginator<Company>;
  companies: Company[] = [];
  loading = false;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.loadCompanies();
  }

  onPageChange(event: any) {
    const nextPage = event.pageIndex + 1;
    this.loadCompanies(nextPage);
  }

  loadCompanies(page: number = 1) {
    this.loading = true;
    this.apiError = null;
    const filters: string[] = [];
    if (this.personId) {
      filters.push(`filters[person_id]=${this.personId}`);
    }
    filters.push(`page=${page}`);
    this.companyService.getAll(filters).subscribe({
      next: (data: Paginator<Company>) => {
        this.paginator = data;
        this.companies = data.data;
        this.loading = false;
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Erro ao buscar empresas.';
        this.loading = false;
      }
    });
  }

  viewCompany(id: number) {
    this.router.navigate(['/companies', id]);
  }

  editCompany(id: number) {
    this.router.navigate(['/companies', id, 'edit']);
  }

  deleteCompany(id: number) {
    if (confirm('Deseja realmente deletar esta empresa?')) {
      this.companyService.delete(id).subscribe(() => {
        this.loadCompanies();
      });
    }
  }

  createCompany() {
    this.router.navigate(['/companies/create']);
  }
}
