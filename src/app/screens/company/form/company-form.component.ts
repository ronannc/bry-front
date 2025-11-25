import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ApiErrorComponent } from '../../../shared/api-error.component';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ApiErrorComponent
  ],
  templateUrl: './company-form.component.html',
  providers: [CompanyService]
})
export class CompanyFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  companyId?: number;
  loading = false;
  apiError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      address: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.companyId = +id;
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: number) {
    this.loading = true;
    this.apiError = null;
    this.companyService.getById(id).subscribe({
      next: (company: Company) => {
        this.form.patchValue(company);
        this.loading = false;
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Erro ao buscar empresa.';
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.apiError = null;
    const company: Company = this.form.value;
    if (this.isEdit && this.companyId) {
      this.companyService.update(this.companyId, company).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          this.apiError = err?.error?.message || 'Erro ao salvar empresa.';
          this.loading = false;
        }
      });
    } else {
      this.companyService.create(company).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          this.apiError = err?.error?.message || 'Erro ao criar empresa.';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/companies']);
  }
}