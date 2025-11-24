import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ApiErrorComponent } from '../../shared/api-error.component';

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
    console.log('CompanyFormComponent constructor');
  }

  ngOnInit() {
    console.log('CompanyFormComponent ngOnInit');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Route param id:', id);
      if (id) {
        this.isEdit = true;
        this.companyId = +id;
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: number) {
    console.log('loadCompany called with id:', id);
    this.loading = true;
    this.apiError = null;
    this.companyService.getById(id).subscribe({
      next: (company: Company) => {
        console.log('Company loaded:', company);
        this.form.patchValue(company);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar empresa:', err);
        this.apiError = err?.error?.message || 'Erro ao buscar empresa.';
        this.loading = false;
      }
    });
  }

  submit() {
    console.log('submit called');
    if (this.form.invalid) {
      console.warn('Formulário inválido:', this.form.value);
      return;
    }
    this.loading = true;
    this.apiError = null;
    const company: Company = this.form.value;
    console.log('Dados do formulário:', company);
    if (this.isEdit && this.companyId) {
      console.log('Atualizando empresa:', this.companyId);
      this.companyService.update(this.companyId, company).subscribe({
        next: () => {
          console.log('Empresa atualizada com sucesso');
          this.loading = false;
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          console.error('Erro ao salvar empresa:', err);
          this.apiError = err?.error?.message || 'Erro ao salvar empresa.';
          this.loading = false;
        }
      });
    } else {
      console.log('Criando nova empresa');
      this.companyService.create(company).subscribe({
        next: () => {
          console.log('Empresa criada com sucesso');
          this.loading = false;
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          console.error('Erro ao criar empresa:', err);
          this.apiError = err?.error?.message || 'Erro ao criar empresa.';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    console.log('cancel called');
    this.router.navigate(['/companies']);
  }
}