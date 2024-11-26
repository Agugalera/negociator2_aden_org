import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Block, Team } from '../../../../@core/interfaces/common/sessions';
import { Student } from '../../../../@core/interfaces/common/students';
import { RepliesService } from '../../../../@core/backend/common/services/reply.service';
import { RepliesFull } from '../../../../@core/interfaces/common/reply';
import { ClimatesService } from '../../../../@core/backend/common/services/climates.service';
import { Climate } from '../../../../@core/interfaces/common/climate';
import { NbToastrService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-step-prenegotation',
  templateUrl: './step-prenegotation.component.html',
  styleUrls: ['./step-prenegotation.component.scss']
})
export class StepPrenegotationComponent implements OnInit, OnDestroy {

  @Input() block: Block;
  variables: RepliesFull[];
  replies: RepliesFull[];
  repliesElement: RepliesFull[];
  activeTeam: Team;
  climate: Climate;
  strategy: Climate;
  activeTab: string = 'Arbotic';
  loadingClimate; loadingStrategy: boolean = false;
  alive: boolean = true;

  constructor(
    private repliesService: RepliesService,
    private toaster: NbToastrService,
    private climateService: ClimatesService,
  ) { }

  ngOnInit() {
    this.activeTeam = this.block.groups[0];
    this.getVariables();
    this.getClimate();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  changeTag(ev) {
    this.activeTab = ev.tabTitle;
    this.getVariables();
    this.getClimate();
    this.activeTeam = this.activeTab === 'Arbotic' ? this.block.groups[0] : this.block.groups[1];
  }

  getVariables() {
    this.repliesService.listReplyFull(this.activeTeam.id).pipe(takeWhile(() => this.alive)).toPromise().then(
      d => {
        this.replies = d.filter(item => item.section === 'variable');
        this.repliesElement = d.filter(item => item.section === 'seven');
      }, error => {
        this.replies = null;
        this.repliesElement = null;
      },
    );
  }

  goCanvas() {
    // TODO verificar el valor del ID
    window.open('https://aden.instructure.com/courses/2803', '_blank');
  }

  getClimate() {
    let _group_id = this.activeTab === 'Arbotic' ? this.block.groups[0].id : this.block.groups[1].id;
    this.climateService.getByGroup(Number(_group_id)).pipe(takeWhile(() => this.alive)).toPromise().then(
      data => {
        this.climate = data.filter(item => item.type === 'climate')[0];
        this.strategy = data.filter(item => item.type === 'strategy')[0];
      },
      error => {
        this.climate = null;
        this.strategy = null;
      }
    );
  }

  getFullName(stu: Student) {
    return stu.firstname + ' ' + stu.lastname;
  }


  saveReturnClimate() {
    this.climate.return_date = new Date();
    const _observable = this.climateService.update(this.climate);
    this.loadingClimate = true;
    _observable.pipe(takeWhile(() => this.alive)).subscribe(
      data => {
        this.toaster.success('Se enviaron los datos de forma correcta', 'OK');
        this.loadingClimate = false;
      },
      error => {
        this.toaster.danger('Se produjo un error en guardar los datos. Intente nuevamente en unos instantes', 'Error');
        this.loadingClimate = false;
      },
    );
  }

  saveReturnStrategy() {
    this.strategy.return_date = new Date();
    const _observable = this.climateService.update(this.strategy);
    this.loadingStrategy = true;
    _observable.pipe(takeWhile(() => this.alive)).subscribe(
      data => {
        this.toaster.success('Se enviaron los datos de forma correcta', 'OK');
        this.loadingStrategy = false;
      },
      error => {
        this.toaster.danger('Se produjo un error en guardar los datos. Intente nuevamente en unos instantes', 'Error')
        this.loadingStrategy = false;
      },
    );
  }

  getCurrentColor(_var: RepliesFull) {
    return this.activeTab === 'Arbotic' ? _var.color_a : _var.color_b;
  }

  getCurrentReply(_var: RepliesFull) {
    return this.activeTab === 'Arbotic' ? _var.reply_a : _var.reply_b;
  }

}
