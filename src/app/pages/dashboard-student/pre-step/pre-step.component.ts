import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { User } from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-pre-step',
  templateUrl: './pre-step.component.html',
  styleUrls: ['./pre-step.component.scss']
})
export class PreStepComponent implements OnInit {

  user: User;
  @Input() state: string;
  @Input() stage: string;
  activeTab: string = '';
  tabTitleClimate: string = 'Clima y estrategia';
  tabTitleVariables: string = 'Variables claves';
  tabTitleSeven: string = 'Siete elementos';

  constructor(
    public toaster: NbToastrService,
  ) { }

  ngOnInit() {
    // this.userService.userChange().subscribe(
    //   data => {
    //     if (data) {

    //     }
    // );
  }



  updateTab(ev) {
    if (ev.tabTitle) {
      if (ev.tabTitle === this.tabTitleClimate) {
        this.activeTab = this.tabTitleClimate;
      }
      if (ev.tabTitle === this.tabTitleVariables) {
        this.activeTab = this.tabTitleVariables;
      }
      if (ev.tabTitle === this.tabTitleSeven) {
        this.activeTab = this.tabTitleSeven;
      }
    } else {
      if (ev == 'variables') {
        this.activeTab = this.tabTitleVariables;
      }
      if (ev == 'seven') {
        this.activeTab = this.tabTitleSeven;
      }
    }
  }

}
