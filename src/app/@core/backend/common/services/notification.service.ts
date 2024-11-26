import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationApi } from '../api/notificacion.api';
import { Notification } from '../../../interfaces/common/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private api: NotificationApi) {
    // super();
  }

  list(): Observable<Notification[]> {
    return this.api.list();
  }

  get(id: number): Promise<Notification> {
    return this.api.get(id).toPromise();
  }

  getByUser(id: number): Observable<Notification[]> {
    return this.api.getByUser(id);
  }
  
  create(user: any): Observable<Notification> {
    return this.api.add(user);
  }

  update(user: any): Observable<Notification> {
    return this.api.update(user);
  }

  read(data): Observable<Notification> {
    return this.api.read(data);
  }

}
