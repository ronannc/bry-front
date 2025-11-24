import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { Paginator } from '../models/paginator.model';

@Injectable({ providedIn: 'root' })
export class PersonService {
  public apiUrl = 'http://localhost:8000/api/persons'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  getAll(url?: string): Observable<Paginator<Person>> {
    const endpoint = url || this.apiUrl;
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
