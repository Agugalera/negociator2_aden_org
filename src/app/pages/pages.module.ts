import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PagesMenu } from "./pages-menu";
import {
  NbMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
} from "@nebular/theme";
import { AuthModule } from "../@auth/auth.module";
import { DashboardAppModule } from "./dashboard-app/dashboard-app.module";
import { SessionsModule } from "./sessions/sessions.module";
import { DashboardStudentModule } from "./dashboard-student/dashboard-student.module";
import { MeetingRoomModule } from "./meeting-room/meeting-room.module";
import { CompaniesModule } from "./companies/companies.module";
import { VariablesModule } from "./variables/variables.module";

const PAGES_COMPONENTS = [PagesComponent];

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
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
    DashboardAppModule,
    DashboardStudentModule,
    SessionsModule,
    MeetingRoomModule,
    CompaniesModule,
    VariablesModule,
    ...NB_MODULES,
  ],
  declarations: [...PAGES_COMPONENTS],
  providers: [PagesMenu],
})
export class PagesModule {}