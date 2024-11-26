import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'lodash';
import { takeWhile } from 'rxjs/operators';
import { SessionsService } from '../../@core/backend/common/services/sessions.service';
import { Sessions } from '../../@core/interfaces/common/sessions';
import { UserStore } from '../../@core/stores/user.store';

@Component({
  selector: 'ngx-dashboard-app',
  templateUrl: './dashboard-app.component.html',
  styleUrls: ['./dashboard-app.component.scss']
})
export class DashboardAppComponent implements OnInit, OnDestroy {

  sessions: Sessions[];
  sessionsInactives: Sessions[];
  activeTab = 'Sesiones Activas';
  user;
  alive: boolean = true;

  constructor(
    private sessionsService: SessionsService,
    private userStore: UserStore
  ) { }

  ngOnInit() {
    this.userStore.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.user = this.userStore.getUser();
        if (this.user) {
          this.getSessions();
        }
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }

  createdSession(ev) {
    this.activeTab = 'Sesiones Activas';
    this.user = this.userStore.getUser();
    if (this.user) {
      this.getSessions();
    }
  }

  getSessions() {
    this.sessionsService.listByTeacher(this.user.sisid).pipe(takeWhile(() => this.alive))
      .toPromise().then(
        data => {
          this.sessions =  filter([...data].reverse(), i => { return i.stateList === 'active'});
          this.sessionsInactives = filter([...data].reverse(), i => { return i.stateList === 'inactive';});
        }
      ).catch(error => {
        this.sessions = [];
        this.sessionsInactives = [];
      });
  }

  changeTab(ev) {
    this.activeTab = ev.tabTitle;
  }

}
