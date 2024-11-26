import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVariablesComponent } from './list/list.component';
import { CreateVariableComponent } from './create/create.component';
import { ViewVariableComponent } from './view/view.component';
import { VariablesRoutingModule } from './variables-routing.module';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbCheckboxModule, NbToggleModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VariablesComponent } from './variables.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateSevenComponent } from './create-seven/create-seven.component';
import { CreateNegotiationComponent } from './create-negociation/create-negociation.component';

@NgModule({
  declarations: [
    VariablesComponent,
    ListVariablesComponent,
    CreateVariableComponent,
    ViewVariableComponent,
    CreateSevenComponent,
    CreateNegotiationComponent,
  ],
  imports: [
    CommonModule,
    VariablesRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbToggleModule,
    NbSelectModule,
    NbCheckboxModule,
    NbInputModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
  ],
})
export class VariablesModule { }
