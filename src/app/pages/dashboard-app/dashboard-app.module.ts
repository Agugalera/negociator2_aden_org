import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAppComponent } from './dashboard-app.component';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbIconModule, NbButtonModule, NbCalendarModule, NbDialogModule, NbAlertModule, NbListModule, NbUserModule } from '@nebular/theme';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { RouterModule } from '@angular/router';
import { SessionsModule } from '../sessions/sessions.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [DashboardAppComponent, SessionDetailComponent, CalendarDashboardComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbAccordionModule,
    NbTabsetModule,
    NbIconModule,
    NbCalendarModule,
    NbDialogModule,
    NbAlertModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
    RouterModule,
    SessionsModule,
    NgPipesModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [CalendarDashboardComponent]
})
export class DashboardAppModule { }
