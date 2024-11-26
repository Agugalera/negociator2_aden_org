import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { HttpClient } from '@angular/common/http';
import { SocketIOAdapter } from './pages/socketio-adapter';
import { Socket } from 'ng-socket-io';
import { UserStore } from './@core/stores/user.store';
import { COMPANIES_CONST } from './utils/const';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>
  <span *ngIf='userId'>
         <ng-chat *ngIf='adapter' [adapter]='adapter' [userId]='userId'
        title='Chat' customTheme='./assets/themes/chat-custom-theme.scss'
        ></ng-chat> 
        </span>
`,
})
export class AppComponent implements OnInit {

  title = 'app';
  userId = null;
  username = '';
  groupId = null;
  companyId = '';
  alive: boolean = true;
  public adapter: SocketIOAdapter = null;

  constructor(
    private analytics: AnalyticsService,
    private socket: Socket,
    private http: HttpClient,
    private userService: UserStore,
  ) {

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.userService.userChange()
      .subscribe(
        (user) => {
          try {
            if (user) {
              this.userId = user['user']['id'];
              this.companyId = user['blocks'][0]['id_company'];
              this.groupId = user['groups'][0]['id_group'];
              this.username = user['user']['firstname'] + ' ' + user['user']['lastname'].charAt(0) + '. - '
                + _.find(COMPANIES_CONST, { id: Number(this.companyId) }).name;

              this.socket.connect();
              this.joinRoom();
              this.iniciarChat();
            } else {
              this.userId = null;
              this.socket.disconnect();
            }
          } catch { }
        }
      );
  }

  public joinRoom(): void {
    if (this.username) {
      this.socket.emit('join', {
        username: this.username,
        idSystem: this.userId
      });
    }
  }

  public iniciarChat(): void {
    this.socket.on('generatedUserId', (generateUserId) => {
      // this.userId = generateUserId;
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(generateUserId, this.userId, this.companyId, this.socket, this.http, this.groupId);
      // this.userId = generateUserId;
    });
  }

}
