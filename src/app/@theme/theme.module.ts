import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule,
  NbThemeModule,
  NbPopoverModule,
  NbListModule,
  NbBadgeModule,
  NbCardModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
} from './layouts';
import { InitUserService } from './services/init-user.service';

import { DEFAULT_THEME } from './styles/theme.default';
import { EvaIconsPipe } from './pipes/eva-icons.pipe';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AlertDialogComponent } from './components/alert/alert.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbBadgeModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbListModule,
  NbButtonModule,
  NbCardModule,
  NbPopoverModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  AlertDialogComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  EvaIconsPipe
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, NotificationsComponent],
  entryComponents: [AlertDialogComponent]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME],
        ).providers,
        InitUserService,
      ],
    };
  }
}
