import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../@core/interfaces/common/companies';

@Component({
  selector: 'ngx-information-step',
  templateUrl: './information-step.component.html',
  styleUrls: ['./information-step.component.scss']
})
export class InformationStepComponent implements OnInit {

  @Input() company: number;
  @Input() state: string;

  constructor(
  ) { }

  ngOnInit() {}

}
