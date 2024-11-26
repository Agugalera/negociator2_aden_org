import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../@auth/admin.guard';
import { CreateSessionComponent } from './create/create.component';
import { ViewSessionComponent } from './view/view.component';
import { SessionsComponent } from './sessions.component';

const routes: Routes = [{
  path: '',
  component: SessionsComponent,
  children: [
    {
      path: 'view/:id/:blockId',
      // canActivate: [AdminGuard],
      component: ViewSessionComponent,
    },
    {
      path: 'create',
      component: CreateSessionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }
