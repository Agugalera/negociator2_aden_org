import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";

import { NbToastrService } from "@nebular/theme";

import { UserData, User } from "../../../@core/interfaces/common/users";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../../@auth/components";
import { ROLES_SELECT } from "../../../@auth/roles";
import { Location } from "@angular/common";

export enum UserFormMode {
  VIEW = "Ver",
  EDIT = "Editar",
  ADD = "Agregar",
  EDIT_SELF = "Mi",
}

@Component({
  selector: "ngx-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  showPassword = true;
  editUserId: string;

  protected readonly unsubscribe$ = new Subject<void>();

  get firstname() {
    return this.userForm.get("firstname");
  }

  get lastname() {
    return this.userForm.get("lastname");
  }

  get id_profile() {
    return this.userForm.get("id_profile");
  }

  get email() {
    return this.userForm.get("email");
  }

  /* get state() {
    return this.userForm.get("state");
  } */

  get password() {
    return this.userForm.get("password");
  }

  mode: UserFormMode;

  roles = ROLES_SELECT;
  states = [
    { key: "1", name: "Activo" },
    { key: "2", name: "Inactivo" },
  ];

  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(
    private usersService: UserData,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: NbToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editUserId = this.route.snapshot.paramMap.get("id");
    this.initUserForm();
    this.loadUserData();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      /* id: this.fb.control(""), */
      id_profile: this.fb.control(3, Validators.required),
      firstname: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastname: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(PASSWORD_PATTERN),
      ]),
      email: this.fb.control("", [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      /* state: this.fb.control("", [Validators.required]), */
    });
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }

  getInputType() {
    if (this.showPassword) {
      return "text";
    }
    return "password";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  loadUserData() {
    const id = this.route.snapshot.paramMap.get("id");
    const isProfile = this.route.snapshot.queryParamMap.get("profile");
    if (isProfile) {
      this.setViewMode(UserFormMode.EDIT_SELF);
      this.loadUser();
    } else {
      if (id) {
        this.setViewMode(UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.ADD);
      }
    }
  }

  loadUser(id?) {
    const loadUser =
      this.mode === UserFormMode.EDIT_SELF
        ? this.usersService.getCurrentUser()
        : this.usersService.get(id);
    loadUser.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      // console.log(user);
      this.userForm.setValue({
        /* id: user.id, */
        id_profile: user.id_profile,
        firstname: user.firstname ? user.firstname : "",
        lastname: user.lastname ? user.lastname : "",
        email: user.email,
        password: "",
      });

      // this is a place for value changes handling
      // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
    });
  }

  convertToUser(value: any): User {
    const user: User = value;
    return user;
  }

  save() {
    const user: User = this.convertToUser(this.userForm.value);

    let observable = new Observable<User>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      observable = this.usersService.updateCurrent(user);
    } else {
      observable = this.editUserId
        ? this.usersService.update(parseInt(this.editUserId, 10), user)
        : this.usersService.create(user);
    }

    observable.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.toasterService.success(
        "",
        `Usuario ${this.mode === UserFormMode.ADD ? "creado" : "actualizado"}!`
      );
      this.location.back();
    });
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}