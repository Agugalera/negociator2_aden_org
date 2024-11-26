import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../../@core/stores/user.store';
import { User } from '../../@core/interfaces/common/users';
import { Block } from '../../@core/interfaces/common/sessions';
import { NbDialogService } from '@nebular/theme';
import { InitialComponent } from './initial/initial.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss'],
})
export class DashboardStudentComponent implements OnInit, OnDestroy {

  activeStep: string;
  user: User;
  company: number;
  state: any;
  stage: any;
  alive: boolean = true;
  modalIsOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userStore: UserStore,
    private dialogService: NbDialogService,
  ) {
    this.route.data;
    this.route.paramMap.subscribe(
      data => {
        this.activeStep = data.get('step');
      },
    );
  }

  ngOnInit() {
    this.userStore.userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          if (data) {
            if (this.user) {
              this.state = data['blocks'][0]['state'];
              this.stage = data['blocks'][0]['stage'];
              return;
            } else {
              this.user = data;
            }
            if (this.user.blocks[0].id_company) {
              // Verifica si el usuario ya oculto el componente inicial del simulador
              if (!localStorage.getItem('hideInitialComponent')) {
                this.openInitialModal();
              }
              this.company = this.user.blocks[0].id_company;
              this.state = data['blocks'][0]['state'];
              this.stage = data['blocks'][0]['stage'];
            }
          }

        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateBlock(block: Block) {
    this.stage = block.stage;
    this.state = block.state;
  }

  openInitialModal() {
    if (this.modalIsOpen) {
      return;
    } else {
      this.modalIsOpen = true;
      this.dialogService.open(InitialComponent)
        .onClose.subscribe(() => this.modalIsOpen = false);
    }
  }
}
