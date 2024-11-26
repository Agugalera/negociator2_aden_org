import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesApi {

  private readonly apiController: string = 'company';

  constructor(private api: HttpService) { }

  list(): Observable<any[]> {
    return this.api.get(this.apiController);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
