import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Paginator } from '../models/paginator.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  public apiUrl = 'http://localhost:8000/api/companies'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  getAll(url?: string): Observable<Paginator<Company>> {
    const endpoint = url || this.apiUrl;
    return this.http.get<Paginator<Company>>(endpoint);
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  update(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, company);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
