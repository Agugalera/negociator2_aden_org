import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from "@nebular/auth";
import { getDeepFromObject } from "../../helpers";
import { NbThemeService, NbToastrService } from "@nebular/theme";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../constants";
import { InitUserService } from "../../../@theme/services/init-user.service";

@Component({
  selector: "ngx-signup",
  templateUrl: "./signup.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSignUpComponent implements OnInit {
  minLength: number = this.getConfigValue(
    "forms.validation.password.minLength"
  );
  maxLength: number = this.getConfigValue(
    "forms.validation.password.maxLength"
  );
  redirectDelay: number = this.getConfigValue("forms.login.redirectDelay");
  showMessages: any = this.getConfigValue("forms.login.showMessages");
  strategy: string = this.getConfigValue("forms.login.strategy");
  rememberMe = this.getConfigValue("forms.login.rememberMe");
  isEmailRequired: boolean = this.getConfigValue(
    "forms.validation.email.required"
  );
  isPasswordRequired: boolean = this.getConfigValue(
    "forms.validation.password.required"
  );

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  get firstname() {
    return this.loginForm.get("firstname");
  }

  get lastname() {
    return this.loginForm.get("firstname");
  }

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    protected initUserService: InitUserService,
    private toasterService: NbToastrService
  ) {}

  ngOnInit(): void {
    const emailValidators = [Validators.pattern(EMAIL_PATTERN)];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
      Validators.pattern(PASSWORD_PATTERN),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control("", [...emailValidators]),
      password: this.fb.control("", [...passwordValidators]),
      firstname: this.fb.control(""),
      lastname: this.fb.control(""),
    });
  }

  register(): void {
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service
      .register(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
          this.toasterService.success("", `Tu cuenta fue creada con éxito!`);
        } else {
          // this.errors = result.getErrors();
          this.errors = [
            "Los datos ingresados no son correctos. Por favor intente nuevamente.",
          ];
        }

        const redirect = result.getRedirect();
        if (redirect) {
          try {
            const profile = result.getResponse().body.user.id_profile;
            if (Number(profile) === 2) {
              return this.router.navigateByUrl("/pages/dashboard");
            }
            if (Number(profile) === 3) {
              return this.router.navigateByUrl(
                "/pages/dashboard-student/information"
              );
            }
            return this.router.navigateByUrl(redirect);
          } catch {
            return this.router.navigateByUrl(
              "/pages/dashboard-student/information"
            );
            // setTimeout(() => {
            //   return this.router.navigateByUrl(redirect);
            // }, this.redirectDelay);
          }
        }
        this.cd.detectChanges();
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}