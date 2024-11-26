 

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardAppComponent } from './dashboard-app/dashboard-app.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardAppComponent,
    },
    {
      path: 'dashboard-student/:step',
      component: DashboardStudentComponent,
    },
    {
      path: 'meeting-room',
      component: MeetingRoomComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'companies',
      loadChildren: () => import('./companies/companies.module')
        .then(m => m.CompaniesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'sessions',
      loadChildren: () => import('./sessions/sessions.module')
        .then(m => m.SessionsModule),
    },
    {
      path: 'variables',
      loadChildren: () => import('./variables/variables.module')
        .then(m => m.VariablesModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
