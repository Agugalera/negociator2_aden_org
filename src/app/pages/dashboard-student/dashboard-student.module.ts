import { ChartModule } from 'angular2-chartjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbIconModule, NbButtonModule, NbCalendarModule, NbDialogModule, NbAlertModule, NbListModule, NbUserModule, NbStepperModule, NbCheckboxModule, NbActionsModule, NbInputModule, NbTooltipModule, NbSelectModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { SessionsModule } from '../sessions/sessions.module';
import { DashboardStudentComponent } from './dashboard-student.component';
import { InformationStepComponent } from './information-step/information-step.component';
import { PreStepComponent } from './pre-step/pre-step.component';
import { NegociationStepComponent } from './negociation-step/negociation-step.component';
import { FinishedStepComponent } from './finished-step/finished-step.component';
import { ChartjsBarComponent } from './negociation-step/chart-general/chartjs-bar.component';
import { FormsModule } from '@angular/forms';
import { NegotationHistorialComponent } from './negotation-historial/negotation-historial.component';
import { ComponentsModule } from '../../@components/components.module';
import { SevenElementsComponent } from './seven-elements/seven-elements.component';
import { VariablesKeyComponent } from './variables-key/variables-key.component';
import { ClimateComponent } from './climate/climate.component';
import { ChartjsLineComponent } from './negociation-step/chart-robots/chartjs-lines.component';
import { InitialComponent } from './initial/initial.component';
import { NgPipesModule } from 'ngx-pipes';
import { ChartsComponent } from './negociation-step/charts/charts.component';
import { ChartsBetaComponent } from './negociation-step/charts-beta/charts-beta.component';
import { ChartjsLineEarningsBetaComponent } from './negociation-step/chart-earnings-beta/chartjs-lines-earnings-beta.component';
import { ChartjsQtyBetaComponent } from './negociation-step/chartjs-qty-beta/chartjs-qty-beta.component';
import { ChartjsErdosBetaComponent } from './negociation-step/chart-erdos-beta/chart-erdos-beta.component';
import { ChartEarningsAlfaComponent } from './negociation-step/chart-earnings-alfa/chartjs-earnings-alfa.component';

@NgModule({
  declarations: [DashboardStudentComponent, InformationStepComponent,
    PreStepComponent, NegociationStepComponent, FinishedStepComponent, ChartjsBarComponent, ChartjsQtyBetaComponent,
    ChartEarningsAlfaComponent, ChartjsLineEarningsBetaComponent, ChartjsErdosBetaComponent,
    ChartjsLineComponent, NegotationHistorialComponent, SevenElementsComponent, VariablesKeyComponent,
    ClimateComponent, InitialComponent, ChartsComponent, ChartsBetaComponent],
  imports: [
    CommonModule,
    ChartModule,
    NbCardModule,
    FormsModule,
    NbAccordionModule,
    NbToggleModule,
    NbTabsetModule,
    NbIconModule,
    NbCalendarModule,
    NbDialogModule,
    NbAlertModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbUserModule,
    RouterModule,
    NbInputModule,
    NbTooltipModule,
    SessionsModule,
    NbCheckboxModule,
    NbStepperModule,
    NbSelectModule,
    NgPipesModule,
    ComponentsModule,
    NbActionsModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [NegotationHistorialComponent, InitialComponent, ChartsComponent, ChartsBetaComponent],
})
export class DashboardStudentModule { }
