import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { Paginator } from '../models/paginator.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonService {
  public apiUrl = environment.apiUrl + '/persons';

  constructor(private http: HttpClient) {}

  getAll(filters?: string[]): Observable<Paginator<Person>> {
    let endpoint = this.apiUrl;
    if (filters && filters.length > 0) {
      endpoint += (endpoint.includes('?') ? '&' : '?') + filters.join('&');    
    }
    return this.http.get<Paginator<Person>>(endpoint);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  create(person: Person | FormData): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  update(id: number, person: Person | FormData): Observable<Person> {
    return this.http.post<Person>(`${this.apiUrl}/${id}?_method=PUT`, person);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
