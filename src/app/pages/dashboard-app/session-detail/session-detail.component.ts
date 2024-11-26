import { Component, OnInit, Input } from '@angular/core';
import { CalendarDashboardComponent } from '../calendar-dashboard/calendar-dashboard.component';
import { NbDialogService } from '@nebular/theme';
import { Sessions } from '../../../@core/interfaces/common/sessions';
import { Student } from '../../../@core/interfaces/common/students';

@Component({
  selector: 'ngx-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {

  @Input() session: Sessions;
  @Input() expand: boolean;
  @Input() date: string;
  @Input() name: string;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
    this.date = this.date.split('-').reverse().join('/');
  }

  openCalendar() {
    this.dialogService.open(CalendarDashboardComponent, {
      context: {
        title: this.name,
      },
    });
  }

  getFullName(stu: Student) {
    return stu.firstname + ' ' + stu.lastname;
  }
}
