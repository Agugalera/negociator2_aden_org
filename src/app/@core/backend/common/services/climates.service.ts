import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClimatesApi } from '../api/climate';
import { Climate } from '../../../interfaces/common/climate';

@Injectable({
  providedIn: 'root'
})
export class ClimatesService {

  constructor(private api: ClimatesApi) {
    // super();
  }

  list(): Observable<Climate[]> {
    return this.api.list();
  }

  get(id: number): Promise<Climate> {
    return this.api.get(id).toPromise();
  }

  getByGroup(id: number): Observable<Climate[]> {
    return this.api.getByGroup(id);
  }
  
  create(user: any): Observable<any> {
    return this.api.add(user);
  }

  update(user: any): Observable<any> {
    return this.api.update(user);
  }

}
