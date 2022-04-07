import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-reset-pwd-init',
  templateUrl: './reset-pwd-init.component.html',
  styleUrls: ['./reset-pwd-init.component.scss']
})
export class ResetPwdInitComponent implements OnInit {
  form: FormGroup;
  error: string;
  success: boolean;
  constructor(private authService: AuthenticationService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  process() {
    this.error = null;
    const {email} = this.form.value;
    this.initResetPwd({email})
  }

  initResetPwd(data : { email: string  }) {
    this.authService.initResetPassword(data).subscribe((res) => {
      this.onSuccess();
      this.success = true;
      this.form.reset();
    }, (err) => {
      this.error = 'Une erreur est survenue lors de la réinitialisation';
    })
  }

  onSuccess() {
    this.snackBar.open('Email de réinitialisation envoyé. Veuillez consulter votre boite mail', 'Fermer');
  }

}
