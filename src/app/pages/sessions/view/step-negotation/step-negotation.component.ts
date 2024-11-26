import { Component, OnInit, Input } from '@angular/core';
import { NegotationsService } from '../../../../@core/backend/common/services/negotation.service';
import { Negotations } from '../../../../@core/interfaces/common/negotation';
import { Variables } from '../../../../@core/interfaces/common/variables';
import { Block, Team } from '../../../../@core/interfaces/common/sessions';
import { Replies } from '../../../../@core/interfaces/common/reply';
import { NbDialogService } from '@nebular/theme';
import { NegotationHistorialComponent } from '../../../dashboard-student/negotation-historial/negotation-historial.component';
import * as _ from 'lodash';
import { ChartsBetaComponent } from '../../../dashboard-student/negociation-step/charts-beta/charts-beta.component';
import { ChartsComponent } from '../../../dashboard-student/negociation-step/charts/charts.component';

@Component({
  selector: 'ngx-step-negotation',
  templateUrl: './step-negotation.component.html',
  styleUrls: ['./step-negotation.component.scss']
})
export class StepNegotationComponent implements OnInit {

  variables: Variables[] = [];
  replies: Replies[] = [];
  @Input() block: Block;
  activeTeam: Team;
  negotations: Negotations[] = [];

  constructor(
    private negotationsService: NegotationsService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit() {
    this.getNegotation();
    this.activeTeam = this.block.groups[0];
  }

  getNegotation() {
    this.negotationsService.getNegotiationByBlock(this.block.id).then(
      data => {
        this.negotations = data.reply;
        this.negotations.map(item => {
          item.valueReply = item.reply ? (item.type === 'boolean' ?
            (item.reply.value === '0' ? false : true) : item.reply.value
          ) : null;
          return item;
        });

      },
      error => {
        this.negotations = [];
      }
    );
  }

  goHistorial() {
    this.dialogService.open(NegotationHistorialComponent, {
      context: {
        block: this.block,
      },
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
    });
  }


  simulateArbotic() {
    let _variables = this.negotations.map(item => {
      let replies = item.reply as Replies;
      replies.id_variable = item.id;
      replies.value = item.valueReply;
      item.reply = replies;
      return item;
    });
    this.dialogService.open(ChartsComponent, {
      context: {
        negotations: _variables,
      },
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true
    });
  }

  simulateByntech() {
    let _variables = this.negotations.map(item => {
      let replies = item.reply as Replies;
      replies.id_variable = item.id;
      replies.value = item.valueReply;
      item.reply = replies;
      return item;
    });
    this.dialogService.open(ChartsBetaComponent, {
      context: {
        negotations: _variables,
      },
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true
    });
  }

}
