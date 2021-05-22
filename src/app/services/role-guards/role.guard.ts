import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from 'src/app';
import { AuthenticationService } from '../authentication-service/authentication.service';
import * as SecureLS from 'secure-ls';
import { ROLE_ENUM, UserModel } from 'src/app/models/user.model';
const ls = new SecureLS({ encodingType: 'aes' });

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authServ: AuthenticationService
) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: UserModel = ls.get(LOCAL_STORAGE_KEYS.USER);
    console.log(user,'roleguard', state.url);

    if (user.role.code === ROLE_ENUM.PATIENT) {
      if(state.url === '/dashboard/patient/home')
      return true
    } else if (user.role.code === ROLE_ENUM.MEDECIN) {
      if(state.url === '/dashboard/medecin/home') {
        return true
      }
    }
    return false;
  }

}
