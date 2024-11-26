import { Injectable } from '@angular/core';
import { CompaniesApi } from '../api/companies.api';
import { Company, CompaniesData } from '../../../interfaces/common/companies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService extends CompaniesData {

  constructor(private api: CompaniesApi) {
    super();
  }

  list(): Observable<Company[]> {
    return this.api.list();
  }

  get(id: number): Observable<Company> {
    return this.api.get(id);
  }

  create(user: any): Observable<Company> {
    return this.api.add(user);
  }

  update(user: any): Observable<Company> {
    return this.api.update(user);
  }
}
