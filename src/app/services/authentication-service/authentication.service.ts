import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { LOCAL_STORAGE_KEYS } from "src/app";
import { LoginModel, LoginResponseModel } from "src/app/models/login.model";
import { UserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import * as SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const { SERVER_URL } = environment;
const REGISTER_USER_URL = `${SERVER_URL}/user/signup`;
const CHECK_EMAIL_URL = `${SERVER_URL}/users/check-account`;
const LOGIN_URL = `${SERVER_URL}/users/login`;
const CURRENT_USER_INFOS = `${SERVER_URL}/user/me`;
const RESET_PWD_INIT_ENDPOINT = `${SERVER_URL}/reset-password/init`;
const RESET_PWD_FINISH_ENDPOINT = `${SERVER_URL}/reset-password/finish`;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  checkEmail(email: string) {
    return this.http.post(CHECK_EMAIL_URL, { email });
  }

  registerUser(newUser: UserModel) {
    return this.http.post(REGISTER_USER_URL, newUser);
  }

  logout() {
    ls.remove(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    ls.removeAll();
    this.router.navigate(["/accueil"]);
  }

  login(loginPayload: LoginModel) {
    return this.http.post<LoginResponseModel>(LOGIN_URL, loginPayload).pipe(
      tap((loginRes) => {
        ls.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, loginRes.token);
      }),
      switchMap((res: any) => {
        return this.getUserInfos();
      })
    );
  }

  getUserInfos() {
    return this.http.get<UserModel>(CURRENT_USER_INFOS).pipe(
      tap((res: UserModel) => {
        ls.set(LOCAL_STORAGE_KEYS.USER, res);
      })
    );
  }

  getUserInfosSaved(): Observable<UserModel> {
    const userInfos = ls.get(LOCAL_STORAGE_KEYS.USER);
    if (userInfos) return of(userInfos);
    return this.getUserInfos();
  }

  initResetPassword(data : { email: string }) {
    return this.http.post(`${RESET_PWD_INIT_ENDPOINT}`, data);
  }

  finishResetPassword(data : { password: string, resetKey: string, confirmPassword: string }) {
    return this.http.put(`${RESET_PWD_FINISH_ENDPOINT}`, data);
  }
}
