
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Paginator } from '../../models/paginator.model';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './company-list.component.html',
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
  @Input() personId?: number;
  paginator?: Paginator<Company>;
  companies: Company[] = [];
  loading = false;

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    console.log('CompanyListComponent inicializado');
    this.loadCompanies();
  }

  onPageChange(event: any) {
    const nextPage = event.pageIndex + 1;
    let url = `${this.companyService.apiUrl}?page=${nextPage}`;
    if (this.personId) {
      url += `&person_id=${this.personId}`;
    }
    this.loadCompanies(url);
  }

  loadCompanies(pageUrl?: string) {
    this.loading = true;
    let url = pageUrl || this.companyService.apiUrl;
    if (this.personId && !pageUrl) {
      url += `?person_id=${this.personId}`;
    }
    console.log('Buscando empresas...', url);
    this.companyService.getAll(url).subscribe({
      next: (data: Paginator<Company>) => {
        console.log('Empresas recebidas:', data);
        this.paginator = data;
        this.companies = data.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar empresas:', err);
        this.loading = false;
      }
    });
  }

  viewCompany(id: number) {
    this.router.navigate(['/companies', id]);
  }

  goToPage(url: string | null) {
    if (url) {
      this.loadCompanies(url);
    }
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
