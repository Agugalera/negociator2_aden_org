import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../../@core/backend/common/services/sessions.service';
import { Block, Team } from '../../../@core/interfaces/common/sessions';
import { Student } from '../../../@core/interfaces/common/students';
import * as _ from 'lodash';
import { NbDialogService } from '@nebular/theme';
import { EmailComposerComponent } from '../../../@components/email-composer/email-composer.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewSessionComponent implements OnInit, OnDestroy {

  idSession: string;
  idBlock: string;
  block: Block;
  alive: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private sessionService: SessionsService,
  ) {
    this.idSession = this.route.snapshot.paramMap.get('id');
    this.idBlock = this.route.snapshot.paramMap.get('blockId');

  }

  ngOnInit() {
    this.getSession();
  }
  ngOnDestroy() {
    this.alive = false;
  }
  getSession() {
    this.sessionService.get(this.idSession).pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          let _tmp = data.blocks.find(data => data.id === this.idBlock);
          // Ordeno los grupos segun en idcompany
          _tmp.groups = _.sortBy(_tmp.groups, ['id_company']);
          this.block = _tmp;
        },
        error => {
          console.log(error);
        }
      );
  }

  goCanvas() {
    // TODO verificar el valor del ID
    window.open('https://aden.instructure.com/courses/2803', '_blank');
  }

  getFullName(stu: Student) {
    return stu.firstname + ' ' + stu.lastname;
  }

  sendEmailAll() {
    this.dialogService.open(EmailComposerComponent, {
      context: {
        block: this.block,
        group: null,
      },
    });
  }

  sendEmailGroup(group: Team) {
    this.dialogService.open(EmailComposerComponent, {
      context: {
        block: this.block,
        group: group,
      },
    });
  }

  updateBlock(block: Block) {
    this.block.stage = block.stage;
    this.block.state = block.state;
  }
}
