import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { DuplicateIdentityService } from '../../services/duplicate-identity.service';
import { DuplicateIdentity } from '../../models/duplicate-identity.model';
import { Paginator } from '../../models/paginator.model';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ApiErrorComponent } from "../../shared/api-error.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-duplicate-identity-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatCardModule, MatProgressSpinner, ApiErrorComponent, MatIconModule],
  templateUrl: './duplicate-identity-list.component.html',
  providers: [DuplicateIdentityService]
})
export class DuplicateIdentityListComponent implements OnInit {
  data: DuplicateIdentity[] = [];
  apiError: string | null = null;
  paginator?: Paginator<DuplicateIdentity>;
  loading = false;
  page = 1;
  successMessage: string | null = null;

  constructor(private service: DuplicateIdentityService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(page: number = 1) {
    this.loading = true;
    this.service.getAll(page).subscribe({
      next: (result) => {
        this.data = result.data;
        this.paginator = result;
        this.page = page;
        this.loading = false;
      },
      error: (err) => {        
        this.apiError = err?.error?.message || 'Erro ao buscar empresas.';
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.loadData(event.pageIndex + 1);
  }

  updateDuplicates() {
    this.loading = true;
    this.apiError = null;
    this.successMessage = null;
    this.service.updateDuplicates().subscribe({
      next: (res) => {
        this.successMessage = res?.message || 'Processamento disparado.';
        this.loadData(this.page);
        this.loading = false;
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Erro ao atualizar duplicados.';
        this.loading = false;
      }
    });
  }
}
