import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DuplicateIdentity } from '../models/duplicate-identity.model';
import { Paginator } from '../models/paginator.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DuplicateIdentityService {
  private apiUrl = environment.apiUrl + '/identidades/duplicadas';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1): Observable<Paginator<DuplicateIdentity>> {
    return this.http.get<Paginator<DuplicateIdentity>>(`${this.apiUrl}?page=${page}`);
  }

  updateDuplicates(): Observable<any> {
    return this.http.post(environment.apiUrl + '/persons/duplicates/update', {});
  }
}
