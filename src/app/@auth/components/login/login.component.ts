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
import { NbThemeService } from "@nebular/theme";
import { EMAIL_PATTERN } from "../constants";
import { InitUserService } from "../../../@theme/services/init-user.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {
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

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    protected initUserService: InitUserService
  ) {}

  ngOnInit(): void {
    const emailValidators = [Validators.pattern(EMAIL_PATTERN)];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control("", [...emailValidators]),
      password: this.fb.control("", [...passwordValidators]),
      rememberMe: this.fb.control(""),
    });
  }

  login(): void {
    this.user = this.loginForm.value;
    this.user.username = this.loginForm.value.email;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
          this.initUserService.initCurrentUser().subscribe();
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
            if (profile === 2) {
              return this.router.navigateByUrl("/pages/dashboard");
            }
            if (profile === 3) {
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