

import { Injectable } from '@angular/core';
import { User } from '../interfaces/common/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from '../backend/common/services/users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user: User;
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private usersService: UsersService) { }

  userChange(): Observable<User> {
    return this.user$.asObservable();
  }


  getUser(): User {
    return this.user;
  }

  setUser(paramUser: User) {
    this.user = paramUser;
    this.user$.next(this.user);
  }

  updateCurrentUser() {
    return this.usersService.getCurrentUser()
      .pipe(tap((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })).toPromise().then().catch();
  }

  logout() {
    localStorage.clear();
    this.setUser(null);
  }

  setSetting(themeName: string) {
    if (this.user) {
      if (this.user.settings) {
        this.user.settings.themeName = themeName;
      } else {
        this.user.settings = { themeName: themeName };
      }
    }
  }
}
