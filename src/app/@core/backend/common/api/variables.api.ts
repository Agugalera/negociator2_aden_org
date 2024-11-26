import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Variables } from '../../../interfaces/common/variables';

@Injectable({
  providedIn: 'root'
})
export class VariablesApi {

  private readonly apiController: string = 'variable';

  constructor(private api: HttpService) { }

  list(type): Observable<Variables[]> {
    let _url = this.apiController;
    if(type) {
      _url += '/section/' + type;
    }
    return this.api.get(_url);
  }

  getByCompany(companyId): Observable<Variables[]> {
    return this.api.get(`${this.apiController}/company/${companyId}`);
  }

  getVariablesBySection(section): Observable<Variables[]> {
    return this.api.get(`${this.apiController}/section/${section}`);
  }

  get(id: number): Observable<Variables> {
    return this.api.get(`${this.apiController}/id/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<Variables> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<Variables> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
