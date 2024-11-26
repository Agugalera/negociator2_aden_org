import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';
import * as _ from 'lodash';
import { COMPANIES_CONST } from '../../../utils/const';
import { NotificationService } from '../../../@core/backend/common/services/notification.service';
import { interval } from 'rxjs';
import { Notification } from '../../../@core/interfaces/common/notification';
import { ClimateStore } from '../../../@core/stores/climate.store';
import { findIndex } from 'lodash';
import { NegotiationStore } from '../../../@core/stores/negotiation.store';
import { VariablesKeyStore } from '../../../@core/stores/variables-key.store';
import { SevenStore } from '../../../@core/stores/seven.store';
import { AlertDialogComponent } from '../alert/alert.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  userId: string = '';
  headerName: string = '';
  notifications: Notification[];
  notificationUnread: number = 0;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
  ];

  currentTheme = 'default';
  alive: boolean = true;
  subscribe: Subscription;
  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userStore: UserStore,
    private climateStore: ClimateStore,
    private variablesStore: VariablesKeyStore,
    private sevenStore: SevenStore,
    private negotationStore: NegotiationStore,
    private dialogService: NbDialogService,
    private settingsService: SettingsData,
    private notificationService: NotificationService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService) {
  }

  getMenuItems() {
    return [
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userStore.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((user => {
        if (user) {
          this.user = user;
          this.checkCompany();
          this.userMenu = this.getMenuItems();
          this.getNotifications();

          // Cada X segundos consulta nuevamente las notificaciones
          const source = interval(10000);
          this.subscribe = source.subscribe(val => {
            this.getNotifications();
          });
        } else {
          if (this.subscribe) {
            this.subscribe.unsubscribe();
          }
        }
      }));


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  getNotifications() {
    try {
      this.userId = this.user['user'][0]['id'];
      this.notificationService.getByUser(this.user['user'][0]['id']).subscribe(
        data => {
          if (data) {
            // Nuevas notificaciones
            if (this.notifications) {

              let diff = _.filter(data, (o) => {
                return !_.find(this.notifications, i => { return i.id == o.id });
              });

              if (findIndex(diff, (i) => { return i.refresh === 'negotiation'; }) >= 0) {
                this.userStore.updateCurrentUser();
                this.negotationStore.refresh();
              }

              if (findIndex(diff, (i) => { return i.refresh === 'climate'; }) >= 0) {
                this.climateStore.refresh();
              }

              if (findIndex(diff, (i) => { return i.refresh === 'variables'; }) >= 0) {
                this.variablesStore.refresh();
              }

              if (findIndex(diff, (i) => { return i.refresh === 'seven'; }) >= 0) {
                this.sevenStore.refresh();
              }

              if (findIndex(diff, (i) => { return i.refresh === 'finalized' }) >= 0) {
                this.dialogService.open(AlertDialogComponent, {
                  context: {
                    title: 'Negociación finalizada',
                    body: '¡Felicitaciones! La propuesta ha sido aceptada. Puedes acceder a la sección "Finalizado" del simulador para descargar el contrato.',
                  },
                });
              }
            }


            this.notifications = _.cloneDeep(data);
            this.notificationUnread = _.filter(this.notifications, function (o) { return !o.readed; }).length;
          } else {
            this.notifications = [];
          }
        },
        error => {
          this.notifications = [];
        },
      );
    } catch {
      this.notifications = [];
    }

  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.alive = false;
  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  checkCompany() {
    try {
      const _companyId = this.user.blocks[0].id_company;
      const _company = _.find(COMPANIES_CONST, { id: Number(_companyId) });
      if (_company) {
        this.headerName = ' | ' + _company.name;
      }
    } catch { }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
