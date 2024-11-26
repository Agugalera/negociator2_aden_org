import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CreateCompanyComponent } from './create/create.component';

const routes: Routes = [{
  path: '',
  component: CompaniesComponent,
  children: [
    {
      path: 'create/:id',
      // canActivate: [AdminGuard],
      component: CreateCompanyComponent,
    },
    { path: '',  component: CreateCompanyComponent },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule { }
