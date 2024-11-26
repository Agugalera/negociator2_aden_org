import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Block, Team } from '../../@core/interfaces/common/sessions';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UsersService } from '../../@core/backend/common/services/users.service';
import { UserStore } from '../../@core/stores/user.store';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-email-composer',
  templateUrl: './email-composer.component.html',
  styleUrls: ['./email-composer.component.scss']
})
export class EmailComposerComponent implements OnInit, OnDestroy {

  form: FormGroup;
  @Input() block: Block;
  @Input() group: Team;
  alive: boolean = true;

  constructor(
    private dialogRef: NbDialogRef<EmailComposerComponent>,
    private userService: UsersService,
    private userStore: UserStore,
    private toaster: NbToastrService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      subject: this.fb.control('', [Validators.required]),
      message: this.fb.control('', [Validators.required]),
      id_author: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.userStore.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            this.form.patchValue(
              { id_author: data['user'][0]['id'] }
            );
          }
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  close() {
    this.dialogRef.close(true);
  }
  addTextContent(ev) {
    this.form.patchValue({
      message: ev,
    });
  }

  send() {
    let _recipients = [];
    if (this.group) {
      _recipients.push({
        id: this.group.id,
        type: 'group',
      });
    } else {
      _recipients.push({
        id: this.block.id,
        type: 'block',
      });
    }

    const _form = this.form.value;
    _form.recipients = _recipients;

    this.userService.sendEmail([_form]).toPromise().then(
      data => {
        // if (data.success) {
        this.toaster.success('Se envió el email de forma correcta', 'OK');
        this.close();
        // } else {
        //   this.toaster.danger('Se produjo un error al enviar el email. Intente nuevamente en unos instantes', 'Error')
        // }
      }).catch(e => {
        this.toaster.danger('Se produjo un error al enviar el email. Intente nuevamente en unos instantes', 'Error')
      });

  }
}
