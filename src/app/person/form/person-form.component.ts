import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ApiErrorComponent } from '../../shared/api-error.component';
import { MatOption } from "@angular/material/core";
import { PersonType } from '../../models/person-type.enum';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule, ApiErrorComponent, MatSelectModule],
  templateUrl: './person-form.component.html',
  providers: [PersonService]
})
export class PersonFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  personId?: number;
  loading = false;
  apiError: string | null = null;
  selectedFile: File | null = null;
  personTypes = Object.values(PersonType);

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone: [''],
      login: ['', [Validators.required, Validators.maxLength(255)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      address: ['', [Validators.maxLength(255)]],
      password: ['', [Validators.minLength(6)]],
      type: ['', Validators.required],
      companyId: [null, Validators.required],
      document: [null]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.personId = +id;
        this.loadPerson(this.personId);
        this.form.get('password')?.setValidators([Validators.minLength(6)]);
      } else {
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      }
    });
  }

  loadPerson(id: number) {
    this.loading = true;
    this.apiError = null;
    this.personService.getById(id).subscribe({
      next: (person: Person) => {
        this.form.patchValue({
          login: person.login,
          name: person.name,
          cpf: person.cpf,
          email: person.email,
          address: person.address,
          type: person.type
        });
        this.loading = false;
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Erro ao buscar pessoa.';
        this.loading = false;
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.get('document')?.setValue(file);
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.apiError = null;
    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (key !== 'document_path' && value !== null && value !== undefined && value !== '') {
        if (key === 'document' && this.selectedFile) {
          formData.append('document', this.selectedFile);
        } else if (key !== 'document') {
          formData.append(key, value as string);
        }
      }
    });
    if (this.isEdit && this.personId) {
      this.personService.update(this.personId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          this.apiError = err?.error?.message || 'Erro ao salvar pessoa.';
          this.loading = false;
        }
      });
    } else {
      this.personService.create(formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          this.apiError = err?.error?.message || 'Erro ao criar pessoa.';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/persons']);
  }
}
