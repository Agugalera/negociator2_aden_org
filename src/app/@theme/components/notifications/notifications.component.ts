import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../../@core/interfaces/common/notification';
import { NotificationService } from '../../../@core/backend/common/services/notification.service';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() notifications: Notification[];
  @Input() userId: string;

  constructor(
    private notificationsService: NotificationService,
  ) { }

  ngOnInit() {
    this.markRead();
  }

  markRead() {
    this.notifications.forEach(item => {
      if (!item.readed) {
        this.notificationsService.read({
          'id_notification' : item.id,
          'id_user' : this.userId,
        }).subscribe(
          data => {}
        );
      }

    })
  }

}
