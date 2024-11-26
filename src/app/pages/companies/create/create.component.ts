import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../@core/backend/common/services/companies.service';
import { Company } from '../../../@core/interfaces/common/companies';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  company: Company;
  companyForm: FormGroup;
  companyId: number;
  inputItemFormControl = new FormControl();
  protected readonly unsubscribe$ = new Subject<void>();
  
  constructor(
    public companiesService: CompaniesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {
    this.companyForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      logo: this.formBuilder.control(''),
      aboutMe: this.formBuilder.control(''),
      aboutOther: this.formBuilder.control(''),
      market: this.formBuilder.control(''),
      negotiation: this.formBuilder.control(''),
      robots: this.formBuilder.control(''),
      welcome: this.formBuilder.control(''),
    });
  }

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    this.route.params.subscribe(routeParams => {
      this.companyId = routeParams.id;
      this.getCompany();
    });
  }

  getCompany() {
    this.companiesService.get(this.companyId).subscribe(
      data => {
        // console.log(data);
        this.company = data;
        this.companyForm.patchValue(this.company);
      }
    );
  }

  save() {
    let observable = new Observable<Company>();
    observable = this.companyForm.value.id
      ? this.companiesService.update(this.companyForm.value)
      : this.companiesService.create(this.companyForm.value);

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toasterService.success('', `Datos ${this.companyForm.value.id ? 'actualizados' : 'creados'}!`);
      });
  }
}
