import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Negotations, NegotationsResponse } from '../../../interfaces/common/negotation';

@Injectable({
  providedIn: 'root',
})
export class NegotationsApi {

  private readonly apiController: string = 'negociation';

  constructor(private api: HttpService) { }

  list(): Observable<Negotations[]> {
    return this.api.get(this.apiController);
  }

  getByGroup(groupId: number): Observable<any> {
    return this.api.get(`${this.apiController}/group/${groupId}`);
  }

  getNegotiationByBlock(blockid: number): Observable<Negotations[]> {
    return this.api.get(`${this.apiController}/block/${blockid}`);
  }

  getNegotiationHistorialByBlock(blockid: number): Observable<Negotations[]> {
    return this.api.get(`${this.apiController}/history/block/${blockid}`);
  }


  get(id: number): Observable<Negotations> {
    return this.api.get(`${this.apiController}/id/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<Negotations> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<Negotations> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
