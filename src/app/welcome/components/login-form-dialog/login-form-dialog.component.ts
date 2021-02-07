import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login-form-dialog",
  templateUrl: "./login-form-dialog.component.html",
  styleUrls: ["./login-form-dialog.component.scss"],
})
export class LoginFormDialogComponent implements OnInit {
  isPasswordVisible: boolean;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  swapInputType() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
