

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStore } from './user.store';
import { NegotationsService } from '../backend/common/services/negotation.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NegotiationStore {

  groupId: number;

  // private climateData: Climate = { value: '' } as Climate;
  private _negotation = new BehaviorSubject<any>(null);
  readonly negotation$ = this._negotation.asObservable();

  constructor(
    private negotationsService: NegotationsService,
    private userStore: UserStore) {
    // this.loadInitialData();
  }

  loadInitialData() {
    return new Promise((resolve, reject) => {
      this.userStore.userChange().subscribe(
        data => {
          if (data && data['user']['profile_name'] == 'student') {
            try {
              this.groupId = Number(data['groups'][0]['id_group']);
              this.getNegotation();
              resolve(true);
            } catch {
              resolve(true);
            }
          }
        }
      );
    })
  }

  getNegotation() {
    this.negotationsService.getByGroup(this.groupId).then(
      data => {
        // console.log( "Negotitations by group:" , data);
        this._negotation.next(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  create(n) {
    return this.negotationsService.create(n).pipe(
      tap(val => {
        this.getNegotation();
      }));
  }

  refresh() {
    this.getNegotation();
  }

  clear() {
    this._negotation.next(null);
  }
}
