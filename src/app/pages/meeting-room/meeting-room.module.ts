import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoomComponent } from './meeting-room.component';
import { NbCardModule, NbListModule, NbUserModule, NbAlertModule, NbIconModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [MeetingRoomComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbAlertModule,
    NbIconModule,
    NbUserModule,
  ]
})
export class MeetingRoomModule { }
