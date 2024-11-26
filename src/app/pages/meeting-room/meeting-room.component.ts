import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionsService } from '../../@core/backend/common/services/sessions.service';
import { takeWhile } from 'rxjs/operators';
import { UserStore } from '../../@core/stores/user.store';
import { Team } from '../../@core/interfaces/common/sessions';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Student } from '../../@core/interfaces/common/students';
import { EmailComposerComponent } from '../../@components/email-composer/email-composer.component';

@Component({
  selector: 'ngx-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss'],
})
export class MeetingRoomComponent implements OnInit, OnDestroy {

  blockId: string;
  groupId: string;
  sessionId: string;
  studentSisid: string;
  team: Team;
  alive: boolean = true;

  constructor(
    private sessionService: SessionsService,
    private userService: UserStore,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
  ) {

  }

  ngOnInit() {
    this.userService.userChange().pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            try {
              this.sessionId = data['blocks'][0]['id_session'];
              this.blockId = data['blocks'][0]['id'];
              this.groupId = data['groups'][0]['id_group'];
              this.studentSisid = String(data['sisid']);
              this.getTeam();
            } catch (e) { }
          }
        }
      );
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    this.alive = false;
  }

  getTeam() {
    this.sessionService.getTeam(this.sessionId, this.blockId, this.groupId)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          this.team = data;
        },
        error => {
          this.toasterService.danger('',
            'Se produjo un error al consultar los datos. Intente nuevamente en unos instantes.');
        },
      );
  }

  sendEmailGroup() {
    this.dialogService.open(EmailComposerComponent, {
      context: {
        block: null,
        group: this.team,
      },
    });
  }

  getFullName(stu: Student) {
    return stu.firstname + ' ' + stu.lastname + ' | ' + stu.email;
  }

}
