import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserStore } from '../../../@core/stores/user.store';

@Component({
  selector: 'ngx-finished-step',
  templateUrl: './finished-step.component.html',
  styleUrls: ['./finished-step.component.scss']
})
export class FinishedStepComponent implements OnInit, OnDestroy {

  @Input() state: string;
  @Input() stage: string;
  alive: boolean = true;
  idSession: string;
  idBlock: string;

  constructor(
    private userStore: UserStore
  ) { }

  ngOnInit() {

    this.userStore.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            try {
              this.idSession = data['blocks'][0]['id_session'];
              this.idBlock = data['blocks'][0]['id'];
            } catch { }
          }

        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  goCanvas() {
    // TODO verificar el valor del ID
    window.open('https://aden.instructure.com/courses/2803', '_blank');
  }

  download() {
    window.open(`${environment.production ? 'https://apisim.aden.org/download' : 'https://apisim.aden.org/download'}/negociator_contrato_${this.idSession}_${this.idBlock}.pdf`, '_blank');
  }

}
