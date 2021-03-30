import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LOCAL_STORAGE_KEYS } from "src/app";
import { LoginModel, LoginResponseModel } from "src/app/models/login.model";
import { UserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

const { SERVER_URL } = environment;
const REGISTER_USER_URL = `${SERVER_URL}/api/users`;
const CHECK_EMAIL_URL = `${SERVER_URL}/api/check-user-exist`;
const LOGIN_URL = `${SERVER_URL}/api/auth/login`;

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

  login(loginPayload: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(LOGIN_URL, loginPayload).pipe(
      tap((loginRes) => {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          loginRes.access_token
        );
        this.router.navigate(["/dashboard"]);
      })
    );
  }
}
