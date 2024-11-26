import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    styleUrls: ['./alert.component.scss'],
    template: `
    <nb-card class="dialog-card">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        {{body}}
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="primary" (click)="dismiss()">Ok</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class AlertDialogComponent {
    @Input() title: string;
    @Input() body: string;

    constructor(protected ref: NbDialogRef<AlertDialogComponent>) {
    }

    dismiss() {
        this.ref.close();
    }
}
