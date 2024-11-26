import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { VariablesService } from '../../../@core/backend/common/services/variables.service';
import { Variables } from '../../../@core/interfaces/common/variables';
import { takeUntil, reduce } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CompaniesService } from '../../../@core/backend/common/services/companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateVariableComponent implements OnInit {

  form: FormGroup;
  protected readonly unsubscribe$ = new Subject<void>();
  get boolean() { return this.form.get('boolean'); }

  // companies: any;
  colors = [{ value: 'danger', name: 'Rojo' }, { value: 'success', name: 'Verde/Amarilla' }];
  // sections = [{value: 'seven', name: '7 elementos'}, {value: 'variable', name: 'Variables'}, {value: 'negociation', name: 'Negociación'}];

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
        Validators.required
      ])),
      type: this.formBuilder.control(''),
      boolean: this.formBuilder.control(false),
      min: this.formBuilder.control(''),
      max: this.formBuilder.control(''),
      section: this.formBuilder.control('variable'),
      color_a: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      color_b: this.formBuilder.control('', Validators.compose([
        Validators.required,
      ])),
      okvalue_a: this.formBuilder.control(''),
      okvalue_b: this.formBuilder.control(''),
      reply_a: this.formBuilder.control('', Validators.compose([
        Validators.required,
      ])),
      reply_b: this.formBuilder.control('', Validators.compose([
        Validators.required,
      ])),
      unit: this.formBuilder.control(''),
      required: (0),
    });
  }

  ngOnInit() {
    // this.companies = this.companiesService.list();
    if (this.route.snapshot.paramMap.get('id')) {
      this.varibalesService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
        data => {
          this.form.patchValue(data);
          this.form.patchValue({
            boolean: data.type === 'boolean' ? true : false,
          });
        },
        error => {
          console.error(error);
        },
      );
    }
  }

  changeBoolean() {
    this.form.patchValue({ boolean: !this.form.value.boolean });
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
        this.router.navigateByUrl('/pages/variables');
      });
  }

  back() {
    this.location.back();
  }
}
