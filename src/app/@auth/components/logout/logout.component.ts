import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { UserStore } from '../../../@core/stores/user.store';
import { VariablesKeyStore } from '../../../@core/stores/variables-key.store';
import { ClimateStore } from '../../../@core/stores/climate.store';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private userService: UserStore,
              private _climateStore: ClimateStore,
              private _variablesStore: VariablesKeyStore,
              protected router: Router) { }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.userService.logout();
    this._variablesStore.clear();
    this._climateStore.clear();
    this.router.navigateByUrl('auth/login');

    // this.service.logout(strategy).subscribe((result: NbAuthResult) => {
    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   } else {
    //     return this.router.navigateByUrl('auth/login');
    //   }
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
