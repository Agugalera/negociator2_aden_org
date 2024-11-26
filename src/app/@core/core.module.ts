import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  StateService,
} from './utils';

import { CommonBackendModule } from './backend/common/common-backend.module';

import { UserStore } from './stores/user.store';
import { UsersService } from './backend/common/services/users.service';
import { SettingsService } from './backend/common/services/settings.service';
import { InitUserService } from '../@theme/services/init-user.service';
import {NgPipesModule} from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChatModule } from 'ng-chat';

export const NB_CORE_PROVIDERS = [
  ...CommonBackendModule.forRoot().providers,

  AnalyticsService,
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule,
    ReactiveFormsModule,
    NgChatModule,
  ],
  exports: [
    NbAuthModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        UserStore,
        UsersService,
        InitUserService,
        SettingsService,
      ],
    };
  }
}
