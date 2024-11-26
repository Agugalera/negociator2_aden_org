import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SessionsRoutingModule } from "./sessions-routing.module";
import { ViewSessionComponent } from "./view/view.component";
import { CreateSessionComponent } from "./create/create.component";
import { RouterModule } from "@angular/router";
import { SessionsComponent } from "./sessions.component";
import {
  NbStepperModule,
  NbAlertModule,
  NbCardModule,
  NbUserModule,
  NbListModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbButtonModule,
  NbSelectModule,
  NbCalendarRangeModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbAccordionModule,
  NbLayoutModule,
  NbActionsModule,
} from "@nebular/theme";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgPipesModule } from "ngx-pipes";
import { FormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { StepInformationComponent } from "./view/step-information/step-information.component";
import { StepNegotationComponent } from "./view/step-negotation/step-negotation.component";
import { StepPrenegotationComponent } from "./view/step-prenegotation/step-prenegotation.component";
import { ComponentsModule } from "../../@components/components.module";
import { AutocompleteModule } from "ng2-input-autocomplete";
import { ReactiveFormsModule } from "@angular/forms";

const NB_MODULES = [
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
];

@NgModule({
  declarations: [
    ViewSessionComponent,
    CreateSessionComponent,
    SessionsComponent,
    StepInformationComponent,
    StepNegotationComponent,
    StepPrenegotationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    AutocompleteModule,
    SessionsRoutingModule,
    ComponentsModule,
    NbLayoutModule,
    NbActionsModule,
    NbStepperModule,
    NbAlertModule,
    NbCardModule,
    NbUserModule,
    NbListModule,
    NbCheckboxModule,
    NbButtonModule,
    NbAlertModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbInputModule,
    NbIconModule,
    NbAccordionModule,
    NbSelectModule,
    NbCalendarRangeModule,
    DragDropModule,
    RouterModule,
    NgPipesModule,
    ReactiveFormsModule,
  ],
  exports: [CreateSessionComponent],
})
export class SessionsModule {}