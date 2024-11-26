import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../../../@core/interfaces/common/students';
import { Block, Team } from '../../../../@core/interfaces/common/sessions';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EmailComposerComponent } from '../../../../@components/email-composer/email-composer.component';
import { SessionsService } from '../../../../@core/backend/common/services/sessions.service';
import { DialogConfirmComponent } from '../../../../@components/dialog-confirm/dialog-confirm.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-step-information',
  templateUrl: './step-information.component.html',
  styleUrls: ['./step-information.component.scss']
})
export class StepInformationComponent implements OnInit {

  @Input() block: Block;
  loading: boolean = false;
  @Output() updated = new EventEmitter<Block>();

  constructor(
    private dialogService: NbDialogService,
    private sessionsService: SessionsService,
    private toasterService: NbToastrService,
  ) { }

  ngOnInit() {
  }

  getFullName(stu: Student) {
    return stu.firstname + ' ' + stu.lastname;
  }

  sendEmailAll() {
    this.dialogService.open(EmailComposerComponent, {
      context: {
        block: this.block,
        group: null,
      },
    });
  }

  sendEmailGroup(group: Team) {
    this.dialogService.open(EmailComposerComponent, {
      context: {
        block: this.block,
        group: group,
      },
    });
  }

  goCanvas() {
    // TODO verificar el valor del ID
    window.open('https://aden.instructure.com/courses/2803', '_blank');
  }

  download() {
    window.open(`${environment.production ? 'https://apisim.aden.org/download' : 'https://apisim.aden.org/download' }/negociator_contrato_${this.block.id_session}_${this.block.id}.pdf`, '_blank');
  }
  
  initPre() {

    this.dialogService.open(DialogConfirmComponent, {
      context: {
        question: '¿Esta seguro que quiere iniciar la etapa de prenegociación?',
      },
    })
      .onClose.subscribe(response => {
        if (response) {
          let _block = {} as Block;
          _block.id = this.block.id;
          _block.id_session = this.block.id_session;
          _block.state = 'pre';
          _block.stage = 'ready';

          this.loading = true;
          this.sessionsService.updateBlock(_block).then(
            data => {
              this.loading = false;
              this.updated.emit(_block);
              this.toasterService.success('', 'Se inicio la etapa de prenegociación de forma correcta.');
            }, error => {
              this.loading = false;
              this.toasterService.danger('',
                'No se pudo inicir la prenegociación. Por favor revise los datos ingresados.');
            },
          );
        }
      });
  }

  initNegotation() {

    this.dialogService.open(DialogConfirmComponent, {
      context: {
        question: '¿Esta seguro que quiere iniciar la etapa de negociación?',
      },
    })
      .onClose.subscribe(response => {
        if (response) {
          let _block = {} as Block;
          _block.id = this.block.id;
          _block.id_session = this.block.id_session;
          _block.state = 'negotation';
          // Stage mantiene el valor del la empresa responsable de enviar la propuesta
          _block.stage = 1;

          this.loading = true;
          this.sessionsService.updateBlock(_block).then(
            data => {
              this.loading = false;
              this.updated.emit(_block);
              this.toasterService.success('', 'Se inicio la etapa de negociación de forma correcta.');
            }, error => {
              this.loading = false;
              this.toasterService.danger('',
                'No se pudo inicir la negociación. Por favor revise los datos ingresados.');
            },
          );
        }
      });


  }

}
