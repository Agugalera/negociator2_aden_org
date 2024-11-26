import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROLES } from './roles';
import { UserStore } from '../@core/stores/user.store';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userStore: UserStore,
    public toaster: NbToastrService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.userStore.getUser();
    const profile = user.user.id_profile;
    if (Number(profile) === ROLES.ADMIN) {
      return of(true);
    } else {
      this.toaster.danger('No tienes los permisos suficientes para acceder a esta contenido.', 'Error');
      return of(false);
    }
  }
}
