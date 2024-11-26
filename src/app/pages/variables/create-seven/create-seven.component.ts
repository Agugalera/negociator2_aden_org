import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { VariablesService } from '../../../@core/backend/common/services/variables.service';
import { CompaniesService } from '../../../@core/backend/common/services/companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Variables } from '../../../@core/interfaces/common/variables';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create-seven',
  templateUrl: './create-seven.component.html',
  styleUrls: ['./create-seven.component.scss'],
})
export class CreateSevenComponent implements OnInit {

  form: FormGroup;
  protected readonly unsubscribe$ = new Subject<void>();
  companies: any;

  constructor(
    public varibalesService: VariablesService,
    public companiesService: CompaniesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: NbToastrService,
    private location: Location,
  ) {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(''),
      value: this.formBuilder.control('', Validators.compose([
        Validators.required,
      ])),
      // id_company: this.formBuilder.control(''),
      section: this.formBuilder.control('seven'),
      type: this.formBuilder.control(''),
      boolean: this.formBuilder.control(0),
      min: this.formBuilder.control(''),
      max: this.formBuilder.control(''),
      color_a: this.formBuilder.control(''),
      color_b: this.formBuilder.control(''),
      okvalue_a: this.formBuilder.control(''),
      okvalue_b: this.formBuilder.control(''),
      reply_a: this.formBuilder.control(''),
      reply_b: this.formBuilder.control(''),
      unit: this.formBuilder.control(''),
      required: this.formBuilder.control(false),
    });
  }

  ngOnInit() {
    this.companies = this.companiesService.list();
    if (this.route.snapshot.paramMap.get('id')) {
      this.varibalesService.get( Number(this.route.snapshot.paramMap.get('id')) ).then(
        data => {
          this.form.patchValue(data);
          this.form.patchValue({
            required: data.required === '1' ? true : false,
          });
        },
        error => {
          console.error(error);
        },
      );
    }
  }


  save() {
    let observable = new Observable<Variables>();

    const data = this.form.value;
    data['type'] = data.boolean ? 'boolean' : 'numeric';
    delete data.boolean;

    observable = this.form.value.id
      ? this.varibalesService.update(data)
      : this.varibalesService.create(data);

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toasterService.success('', `Variable ${this.form.value.value ? 'actualizada' : 'creada'}!`);
        this.router.navigateByUrl('/pages/variables/seven');
      });
  }

  back() {
    this.location.back();
  }

}
