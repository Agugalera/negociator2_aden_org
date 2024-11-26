import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VariablesService } from '../../../@core/backend/common/services/variables.service';
import { Variables } from '../../../@core/interfaces/common/variables';
import { UserStore } from '../../../@core/stores/user.store';
import { Replies, RepliesFull } from '../../../@core/interfaces/common/reply';
import { RepliesService } from '../../../@core/backend/common/services/reply.service';
import { NbToastrService } from '@nebular/theme';
import { SessionsService } from '../../../@core/backend/common/services/sessions.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { SevenStore } from '../../../@core/stores/seven.store';
import { assign, orderBy, uniqBy } from 'lodash';

@Component({
  selector: 'ngx-seven-elements',
  templateUrl: './seven-elements.component.html',
  styleUrls: ['./seven-elements.component.scss']
})
export class SevenElementsComponent implements OnInit, OnDestroy {

  elements: RepliesFull[];
  elementsOtherTeam: Variables[];
  companyId;
  sessionId: string;
  blockId: string;
  groupId;
  user: any;
  lastUpdate: { date: string, user: string };
  loading: boolean = false;
  @Input() state: string;
  @Input() stage: string;
  loadOtherElement = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private variables: VariablesService,
    private repliesService: RepliesService,
    private userService: UserStore,
    private sevenStore: SevenStore,
    public toaster: NbToastrService,
    private sessionService: SessionsService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit() {
    this.userService.userChange().pipe(takeUntil(this._unsubscribeAll)).subscribe(
      async data => {
        if (data) {
          this.user = data.user;
          this.sevenStore.loadInitialData();
          this.elementsOtherTeam = await this.sevenStore.getOnlySevenElements() as Variables[];
          try {
            this.companyId = data['blocks'][0]['id_company'];
            this.sessionId = data['blocks'][0]['id_session'];
            this.blockId = data['blocks'][0]['id'];
            this.groupId = data['groups'][0]['id_group'];
            this.getElements();
            this.getOtherTeam();
          } catch {
            this.companyId = 1;
          }
        } else {
          this.companyId = 1;
        }
      }
    );
  }

  getElements() {
    this.sevenStore.elements$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      data => {
        if (data && data.length) {
          try {
            if (data[0].lastUpdate) {
              this.lastUpdate = data[0].lastUpdate;
            }
          } catch { }
          this.elements = this.elements ? assign(this.elements, data) : data;
        } else {
          this.elements = null;
        }
      }
    );
  }

  saveElements() {

    let _replies: Replies[] = [];

    // Verifica que las valores obligarios de hayan ingresado
    const _countRequired = _.find(this.elements,
      (o) => {
        return o.required === 'true' && !o.valueReply;
      });
    if (_countRequired) {
      this.toaster.danger('Por favor ingrese todas las variables marcadas como obligatorias.',
        'Error', { destroyByClick: true, duration: 0, icon: 'close' });
      return;
    }
    _replies = this.elements.map(item => {
      let _item =  {
        id_group: this.groupId,
        color: item.colorReply,
        shared: item.sharedReply ? '1' : '0',
        id_variable: item.id,
        value: item.valueReply,
        creation_date: new Date(),
        author: this.user.email,
      };
      if (this.lastUpdate) {
        _item['id'] = item.reply.id;
      }
      return _item;
    });

    let _observable;

    if (this.lastUpdate) {
      _observable = this.sevenStore.update(_replies);
    } else {
      _replies.map(item => {
        delete item.id;
        return item;
      });
      _observable = this.sevenStore.create(_replies);
    }

    this.loading = true;
    _observable.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      data => {
        this.loading = false;
        this.toaster.success(this.lastUpdate ? 'Se actualizaron los datos de forma correcta' :
          'Se crearon los datos de forma correcta', 'Excelente!');
      },
      error => {
        this.loading = false;
        this.toaster.danger('Se produjo un error en guardar los datos. Intente nuevamente en unos instantes',
          'Error');
      },
    );
  }

  async getOtherTeam() {
    if (this.elementsOtherTeam && this.elementsOtherTeam.length) {
      this.sessionService.getOtherTeam(this.sessionId, this.blockId, this.groupId)
        .pipe(takeUntil(this._unsubscribeAll))
        .toPromise().then(
          data => {
            try {
              this.repliesService.getByGroup(data.id).pipe(takeUntil(this._unsubscribeAll))
                .toPromise().then(
                  async replies => {
                    if (replies.length) {
                      const _repliesShared = replies.filter(item => Number(item.shared) === 1);
                      let arrayOrdenado = uniqBy(orderBy(_repliesShared, ['creation_date'], ['desc']), 'id_variable');
                      await this.elementsOtherTeam.map(v => {
                        arrayOrdenado.forEach(async item => {
                          if (v.id === item.id_variable) {
                            v.id = item.id;
                            v.valueReply = item.value;
                            v.sharedReply = Number(item.shared) === 1 ? true : false;
                            return v;
                          }
                        });
                      });
                      this.elementsOtherTeam = this.elementsOtherTeam.filter(item => item.sharedReply === true);
                      this.loadOtherElement = true;
                    }
                  },
                  error => {
                    this.elementsOtherTeam = [];
                  });
            } catch { }
          },
          error => {
            this.elementsOtherTeam = [];
          },
        );
    } else {
      this.elementsOtherTeam = [];
    }
  }

}
