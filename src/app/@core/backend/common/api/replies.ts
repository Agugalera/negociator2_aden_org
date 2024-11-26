import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Replies, RepliesFull } from '../../../interfaces/common/reply';

@Injectable({
  providedIn: 'root'
})
export class RepliesApi {

  private readonly apiController: string = 'reply';

  constructor(private api: HttpService) { }

  list(): Observable<Replies[]> {
    return this.api.get(this.apiController);
  }

  listReplyFull(groupId: string): Observable<RepliesFull[]> {
    return this.api.get(`${this.apiController}/full/group/${groupId}`).pipe(map(
      data =>
        data.map( (item) => {
          item.reply = item.response;
          return { ...item } as RepliesFull;
        })
    ));
  }

  getByGroup(groupId): Observable<Replies[]> {
    return this.api.get(`${this.apiController}/group/${groupId}`);
  }

  getByCompany(companyId): Observable<Replies[]> {
    return this.api.get(`${this.apiController}/company/${companyId}`);
  }

  get(id: number): Observable<Replies> {
    return this.api.get(`${this.apiController}/id/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<Replies> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<Replies> {
    return this.api.put(`${this.apiController}`, item);
  }
}
