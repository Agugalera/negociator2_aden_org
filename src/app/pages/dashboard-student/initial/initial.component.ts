import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit {

  checked = false;

  constructor(
    private dialogRef: NbDialogRef<InitialComponent>,

  ) { }

  toggle(checked: boolean) {
    this.checked = checked;
  }
  ngOnInit() {
  }

  close() {
    if (this.checked) {
      localStorage.setItem('hideInitialComponent', 'true');
    }
    this.dialogRef.close();
  }
}
