import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../../../interfaces/common/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationApi {

  private readonly apiController: string = 'notification';

  constructor(private api: HttpService) { }

  list(): Observable<Notification[]> {
    return this.api.get(this.apiController);
  }

  getByUser(id: number): Observable<Notification[]> {
    return this.api.get(`${this.apiController}/userid/${id}`);
  }

  get(id: number): Observable<Notification> {
    return this.api.get(`${this.apiController}/id/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(item: any): Observable<Notification> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<Notification> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }

  read(data) {
    return this.api.post(`${this.apiController}/read`, data);

  }
}
