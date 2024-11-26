import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Variables } from '../../../@core/interfaces/common/variables';
import { Replies, RepliesFull } from '../../../@core/interfaces/common/reply';
import { NbToastrService } from '@nebular/theme';
import { UserStore } from '../../../@core/stores/user.store';
import { takeWhile } from 'rxjs/operators';
import { VariablesKeyStore } from '../../../@core/stores/variables-key.store';
import { assign } from 'lodash';

@Component({
  selector: 'ngx-variables-key',
  templateUrl: './variables-key.component.html',
  styleUrls: ['./variables-key.component.scss']
})
export class VariablesKeyComponent implements OnInit, OnDestroy {

  variables: RepliesFull[];
  companyId;
  lastUpdate: { date: string, user: string };
  groupId;
  colors = [{ value: 'danger', name: 'Rojo' }, { value: 'success', name: 'Verde' },
  { value: 'warning', name: 'Amarilla' }];
  user: any;
  loading: boolean = false;
  @Output() activeTab: EventEmitter<string> = new EventEmitter<string>();
  alive: boolean = true;

  constructor(
    private variablesStore: VariablesKeyStore,
    private userService: UserStore,
    public toaster: NbToastrService,
  ) { }

  ngOnInit() {
    // this.getVariables();
    this.userService.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            this.user = data.user;
            try {
              this.companyId = data['blocks'][0]['id_company'];
              this.groupId = data['groups'][0]['id_group'];
              this.getVariables();
            } catch {
              this.companyId = 1;
              this.getVariables();
            }
          } else {
            this.companyId = 1;
            this.getVariables();
          }
        },
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getVariables() {
    this.variablesStore.variables$.pipe(takeWhile(() => this.alive)).subscribe(
      data => {
        if (data && data.length) {
          try {
            if (data[0].lastUpdate) {
              this.lastUpdate = data[0].lastUpdate;
            }
          } catch { }
          this.variables = this.variables ? assign(this.variables, data) : data;
        } else {
          this.variables = null;
        }
      }
    );
  }

  saveVariables() {
    // Verifica que tenga solo una variable roja asignada 
    const _countVariablesDanger = this.variables.filter(item => ('danger' === item.colorReply));
    if (_countVariablesDanger.length !== 1) {
      this.toaster.danger('Por favor verifique las valores ingresados. Solo deben colocar una variable roja.',
        'Error', { destroyByClick: true, duration: 0, icon: 'close' });
      return;
    }

    // Verifica si alguna variable marcada como roja no corresponde
    const variablesDangerBad = this.variables.filter(item => (item.colorReply === 'danger' && this.getCurrentColor(item) !== 'danger'));
    if (variablesDangerBad.length) {
      this.toaster.danger(this.getCurrentReply(variablesDangerBad[0]),
        variablesDangerBad[0].value, { destroyByClick: true, duration: 0, icon: 'close' });
      return;
    }

    // Verifica si alguna de las variables rojas no se puso de forma correcta
    const variablesDanger = this.variables.filter(item => (this.getCurrentColor(item) === 'danger' && this.getCurrentColor(item) !== item.colorReply));
    if (!variablesDanger.length) {
      let _replies: Replies[] = [];

      _replies = this.variables.map(item => {
        let _item = {
          // id: item.id,
          id_group: this.groupId,
          color: item.colorReply,
          id_variable: item.id,
          value: item.type == 'boolean' ? item.valueReply ? '1' : '0' : item.valueReply,
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
        _observable = this.variablesStore.update(_replies);
      } else {
        _replies.map(item => {
          if (item.id) {
            delete item.id;
          }
          return item;
        });
        _observable = this.variablesStore.create(_replies);
      }

      this.loading = true;

      _observable
        .pipe(takeWhile(() => this.alive))
        .subscribe(
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
    } else {
      this.toaster.danger(variablesDanger[0] ? this.getCurrentReply(variablesDanger[0]) :
        'Por favor verifique los datos ingresados', variablesDanger[0].value,
        { destroyByClick: true, duration: 0, icon: 'close' });
    }
  }

  goToSeven() {
    this.activeTab.emit('seven');
  }

  getCurrentColor(_var: RepliesFull) {
    return Number(this.companyId) === 1 ? _var.color_a : _var.color_b;
  }

  getCurrentReply(_var: RepliesFull) {
    return Number(this.companyId) === 1 ? _var.reply_a : _var.reply_b;
  }
}
