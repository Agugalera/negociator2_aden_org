

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxLogoutComponent
} from './components';
import { NgxSignUpComponent } from './components/signup/signup.component';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
    },
    {
      path: 'login',
      component: NgxLoginComponent,
    },
    {
      path: 'logout',
      component: NgxLogoutComponent,
    },
    {
      path: 'register',
      component: NgxSignUpComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
