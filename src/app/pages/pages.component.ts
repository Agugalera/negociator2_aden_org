import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import { UserStore } from '../@core/stores/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  alive: boolean = true;
  user: any;

  constructor(private pagesMenu: PagesMenu,
    private router: Router,
    protected initUserService: InitUserService,
    private userService: UserStore
  ) {
    this.userService.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data) => {
          try {
            if (!this.user) {
              this.user = data;
              let profile = this.user.user.id_profile;
              this.initMenu(profile);
              if (Number(profile) === 3) {
                this.router.navigateByUrl('/pages/dashboard-student/information');
              }
              if (Number(profile) === 2) {
                this.router.navigateByUrl('/pages/dashboard');
              }
            }
          } catch {
            this.initMenu();
          }
        }
      )
  }

  initMenu(role?) {
    this.pagesMenu.getMenu(role)
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
