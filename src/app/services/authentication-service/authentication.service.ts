import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

const { SERVER_URL } = environment;
const REGISTER_USER_URL = `${SERVER_URL}/api/users`;
const CHECK_EMAIL_URL = `${SERVER_URL}/api/check-user-exist`;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  checkEmail(email: string) {
    return this.http.post(CHECK_EMAIL_URL, { email });
  }

  registerUser(newUser: UserModel) {
    return this.http.post(REGISTER_USER_URL, newUser);
  }
}
