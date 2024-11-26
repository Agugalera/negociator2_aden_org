import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VariablesData, Variables } from '../../../interfaces/common/variables';
import { VariablesApi } from '../api/variables.api';

@Injectable({
  providedIn: 'root'
})
export class VariablesService extends VariablesData {

  constructor(private api: VariablesApi) {
    super();
  }

  list(type = null): Observable<Variables[]> {
    return this.api.list(type);
  }

  getByCompany(companyId): Observable<Variables[]> {
    return this.api.getByCompany(companyId);
  }

  getVariablesBySection(companyId): Observable<Variables[]> {
    return this.api.getVariablesBySection(companyId);
  }


  get(id: number): Promise<Variables> {
    return this.api.get(id).toPromise();
  }

  create(user: any): Observable<Variables> {
    return this.api.add(user);
  }

  update(user: any): Observable<Variables> {
    return this.api.update(user);
  }

}
