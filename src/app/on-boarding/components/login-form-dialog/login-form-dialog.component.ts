import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";

@Component({
  selector: "app-login-form-dialog",
  templateUrl: "./login-form-dialog.component.html",
  styleUrls: ["./login-form-dialog.component.scss"],
})
export class LoginFormDialogComponent implements OnInit {
  isPasswordVisible: boolean;
  form: FormGroup;
  loading: boolean;
  errorMessage: string;
  loginHasError: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialog: MatDialogRef<LoginFormDialogComponent>,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  swapInputType() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    this.loading = true;
    this.loginHasError = false;
    const loginPayload = {
      login: this.form.value.login,
      password: this.form.value.password,
    };
    this.authenticationService.login(loginPayload).subscribe(
      () => {
        this.loading = false;
        this.dialog.close();
        this.router.navigate(["/dashboard"]);
      },
      (err) => {
        this.loading = false;
        this.loginHasError = true;
        this.errorMessage = err?.error?.message
          ? err.error.message
          : "Une erreur est survenue";
      }
    );
  }
}
