

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Climate } from '../interfaces/common/climate';
import { ClimatesService } from '../backend/common/services/climates.service';
import { UserStore } from './user.store';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class ClimateStore {

  groupId: number;

  private climateData: Climate = { value: '' } as Climate;
  private _climate = new BehaviorSubject<Climate>(this.climateData);
  readonly climate$ = this._climate.asObservable();

  private strategyData: Climate = { value: '' } as Climate;
  private _strategy = new BehaviorSubject<Climate>(this.strategyData);
  readonly strategy$ = this._strategy.asObservable();

  constructor(
    private climateService: ClimatesService,
    private userStore: UserStore) {
    // this.loadInitialData();
  }

  loadInitialData() {
    this.userStore.userChange().subscribe(
      data => {
        if (data && data['user']['profile_name'] == 'student') {
          try {
            this.groupId = Number(data['groups'][0]['id_group']);
            this.getClimate();
          } catch {
          }
        }
      }
    );
  }

  // the getter will return the last value emitted in _todos subject
  get climate(): Climate {
    return this._climate.getValue();
  }

  getClimate() {
    this.climateService.getByGroup(this.groupId).toPromise().then(
      data => {
         const _climateTmp = data.filter(item => item.type === 'climate');
         this._climate.next(_climateTmp.length == 0 ? this.climateData  : _climateTmp[0]);
         const _strategyTmp = data.filter(item => item.type === 'strategy');
         this._strategy.next(_strategyTmp.length == 0 ? this.strategyData : _strategyTmp[0]);
      },
      error => {
        // console.error(error);
      }
    );
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set climate(val: Climate) {
    this._climate.next(val);
  }

  createClimate(climate) {
    return this.climateService.create(climate).pipe(
      tap(val => {
        this._climate.next(JSON.parse(val));
      }));
  }

  updateClimate(climate) {
    return this.climateService.update(climate).pipe(
      tap(val => {
        this._climate.next(JSON.parse(val));
      }));
  }

  createStrategy(strategy) {
    return this.climateService.create(strategy).pipe(
      tap(val => {
        this._strategy.next(JSON.parse(val));
      }));
  }

  updateStrategy(strategy) {
    return this.climateService.update(strategy).pipe(
      tap(val => {
        this._strategy.next(JSON.parse(val));
      }));
  }

  refresh() {
    this.getClimate();
  }

  clear() {
    this._strategy.next(null);
    this._climate.next(null);
}
}
