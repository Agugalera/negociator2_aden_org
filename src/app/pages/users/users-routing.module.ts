import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { AdminGuard } from '../../@auth/admin.guard';
import { ListUsersComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'current',
      component: UserComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'list',
      canActivate: [AdminGuard],
      component: ListUsersComponent,
    },
    { path: '', component: ListUsersComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {

}
