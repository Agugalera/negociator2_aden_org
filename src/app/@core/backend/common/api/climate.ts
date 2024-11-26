import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Climate } from '../../../interfaces/common/climate';

@Injectable({
  providedIn: 'root'
})
export class ClimatesApi {

  private readonly apiController: string = 'climate';

  constructor(private api: HttpService) { }

  list(): Observable<Climate[]> {
    return this.api.get(this.apiController);
  }

  getByGroup(id: number): Observable<Climate[]> {
    return this.api.get(`${this.apiController}/group/${id}`);
  }


  get(id: number): Observable<Climate> {
    return this.api.get(`${this.apiController}/id/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<Climate> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<Climate> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
