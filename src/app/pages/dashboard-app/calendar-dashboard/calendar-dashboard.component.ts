import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  @Input() title: string;
  date: any;

  constructor(protected ref: NbDialogRef<CalendarDashboardComponent>) {}

  ngOnInit(){

  }

  dismiss() {
    this.ref.close();
  }

}
