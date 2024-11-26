import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent {

  @Input() question: string;

  constructor(protected ref: NbDialogRef<DialogConfirmComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
