import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewVariableComponent } from './view/view.component';
import { CreateVariableComponent } from './create/create.component';
import { ListVariablesComponent } from './list/list.component';
import { VariablesComponent } from './variables.component';
import { CreateSevenComponent } from './create-seven/create-seven.component';
import { CreateNegotiationComponent } from './create-negociation/create-negociation.component';

const routes: Routes = [{
  path: '',
  component: VariablesComponent,
  children: [
    {
      path: 'view/:id',
      // canActivate: [AdminGuard],
      component: ViewVariableComponent,
    },
    {
      path: 'create',
      component: CreateVariableComponent,
    },
    {
      path: 'create-seven',
      component: CreateSevenComponent,
    },
    {
      path: 'create-negotiation',
      component: CreateNegotiationComponent,
    },
    { path: ':type',  component: ListVariablesComponent },
    { path: '',  component: ListVariablesComponent },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariablesRoutingModule { }
