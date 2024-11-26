import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserStore } from '../../../@core/stores/user.store';
import { Climate } from '../../../@core/interfaces/common/climate';
import { NbToastrService } from '@nebular/theme';
import { ClimateStore } from '../../../@core/stores/climate.store';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.scss']
})
export class ClimateComponent implements OnInit, OnDestroy {

  companyId;
  groupId;
  user;
  climate = { value: '' } as Climate;
  strategy = { value: '' } as Climate;
  lastClimate;
  lastStrategy;
  loadingClimate: boolean = false;
  loadingStrategy: boolean = false;

  @Input() state: string;
  @Input() stage: string;
  @Output() activeTab: EventEmitter<string> = new EventEmitter<string>();
  user$: Subscription;
  alive: boolean = true;

  constructor(
    private userService: UserStore,
    private climateStore: ClimateStore,
    public toaster: NbToastrService,
  ) { }

  ngOnInit() {
    this.climateStore.loadInitialData();
    this.user$ = this.userService.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            this.user = data.user;
            try {
              this.companyId = data['blocks'][0]['id_company'];
              this.groupId = data['groups'][0]['id_group'];
              this.getClimate();
            } catch {
              this.companyId = 1;
              this.getClimate();
            }
          } else {
            this.companyId = 1;
            this.getClimate();
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.alive = false;
  }

  getClimate() {
    this.climateStore.climate$.pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            this.climate = data;
            if (data && data.creation_date) {
              this.lastClimate = data;
            }
          } else {
            this.climate = { value: '' } as Climate;
          }
        }
      );
    this.climateStore.strategy$.pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            this.strategy = data;
            if (data && data.creation_date) {
              this.lastStrategy = data;
            }
          } else {
            this.strategy = { value: '' } as Climate;
          }
        }
      );
  }

  saveClimate() {

    if (this.climate.value) {
      this.climate.id_group = this.groupId;
      this.climate.author = this.user.email,
        this.climate.creation_date = new Date();
      this.climate.type = 'climate';

      let _observable;
      if (this.climate.id) {
        _observable = this.climateStore.updateClimate(this.climate);
      } else {
        _observable = this.climateStore.createClimate(this.climate);
      }
      this.loadingClimate = true;
      _observable.pipe(takeWhile(() => this.alive))
        .subscribe(
          data => {
            this.toaster.success('Se enviaron los datos de forma correcta', 'OK');
            // this.getClimate();
            this.loadingClimate = false;
          },
          error => {
            this.toaster.danger('Se produjo un error en guardar los datos. Intente nuevamente en unos instantes', 'Error');
            this.loadingClimate = false;
          },
        );
    }
  }

  saveStrategy() {
    this.strategy.id_group = this.groupId;
    this.strategy.author = this.user.email;
    this.strategy.creation_date = new Date();
    this.strategy.type = 'strategy';

    let _observable;
    if (this.strategy.id) {
      _observable = this.climateStore.updateStrategy(this.strategy);
    } else {
      _observable = this.climateStore.createStrategy(this.strategy);
    }
    this.loadingStrategy = true;
    _observable.pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          this.toaster.success('Se enviaron los datos de forma correcta', 'OK');
          this.getClimate();
          this.loadingStrategy = false;
        },
        error => {
          this.toaster.danger('Se produjo un error en guardar los datos. Intente nuevamente en unos instantes', 'Error');
          this.loadingStrategy = false;
        },
      );
  }

  goToVariablesKey() {
    this.activeTab.emit('variables');
  }
}
