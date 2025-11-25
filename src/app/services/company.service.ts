import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Paginator } from '../models/paginator.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  public apiUrl = environment.apiUrl + '/companies';

  constructor(private http: HttpClient) {}

  getAll(filters?: string[]): Observable<Paginator<Company>> {
      let endpoint = this.apiUrl;
      if (filters && filters.length > 0) {
        endpoint += (endpoint.includes('?') ? '&' : '?') + filters.join('&');    
      }
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

  getAllWithoutPagination(filters?: string[]): Observable<Company[]> {
    let endpoint = this.apiUrl;
    if (filters && filters.length > 0) {
      endpoint += (endpoint.includes('?') ? '&' : '?') + filters.join('&');    
    }
    return this.http.get<Company[]>(endpoint);
  }
}
