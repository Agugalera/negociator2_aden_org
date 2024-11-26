import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ReplyData, Replies, RepliesFull } from '../../../interfaces/common/reply';
import { RepliesApi } from '../api/replies';

@Injectable({
  providedIn: 'root'
})
export class RepliesService extends ReplyData {

  constructor(private api: RepliesApi) {
    super();
  }

  list(): Observable<Replies[]> {
    return this.api.list();
  }

  listReplyFull(groupId: any): Observable<RepliesFull[]> {
    return this.api.listReplyFull(groupId);
  }

  getByGroup(groupId: any): Observable<Replies[]> {
    return this.api.getByGroup(groupId);
  }

  get(id: number): Promise<Replies> {
    return this.api.get(id).toPromise();
  }

  create(user: any): Observable<Replies> {
    return this.api.add(user);
  }

  createMassive(replies: Replies[]): Observable<any[]> {
    let _observables = [];
    replies.forEach(element => {
      _observables.push(this.create(element));
    });
    return forkJoin(_observables);
  }

  update(user: any): Observable<Replies> {
    return this.api.update(user);
  }
}
