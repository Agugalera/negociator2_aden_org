import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CreateCompanyComponent } from './create/create.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompaniesComponent, CreateCompanyComponent],
  imports: [
    CommonModule,
    ThemeModule,
    CompaniesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class CompaniesModule { }
