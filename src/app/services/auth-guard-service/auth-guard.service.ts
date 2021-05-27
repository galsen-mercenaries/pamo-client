import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { LOCAL_STORAGE_KEYS } from "src/app";
import * as SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = ls.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    // const role = localStorage.getItem(LOCAL_STORAGE_KEYS.USER)?.role;
    if (token) {
      if (
        state.url !== "/accueil" &&
        state.url !== "/" &&
        state.url !== "/register"
      )
        return true;
      this.router.navigate(["/dashboard"]);
      return false;
    } else {
      if (
        state.url === "/accueil" ||
        state.url === "/" ||
        state.url === "/register"
      )
        return true;
      this.router.navigate(["/accueil"]);
      return false;
    }
  }
}
