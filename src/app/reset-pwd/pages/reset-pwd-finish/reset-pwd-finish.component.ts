import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-reset-pwd-finish',
  templateUrl: './reset-pwd-finish.component.html',
  styleUrls: ['./reset-pwd-finish.component.scss']
})
export class ResetPwdFinishComponent implements OnInit {
  resetKey: string;
  form: FormGroup;
  error: string;
  success: boolean;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthenticationService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password:[ '', [Validators.required] ],
      confirmPassword:[ '', [Validators.required] ]
    });
    this.route.queryParams.subscribe(
      (res) => {
        this.resetKey = res?.resetKey;
      }
    )
  }

  process() {
    this.error = null;
    const {password, confirmPassword} = this.form.value;
    if(password !== confirmPassword) {
      this.error = 'Les mots de passe renseignés ne sont pass conformes';
    } else {
      this.finishResetPwd({password, confirmPassword, resetKey: this.resetKey})
    }
  }

  finishResetPwd(data : { password: string, resetKey: string, confirmPassword: string }) {
    this.authService.finishResetPassword(data).subscribe((res) => {
      this.onSuccess();
      this.success = true;
      this.form.reset();
    }, (err) => {
      this.error = 'Une erreur est survenue lors de la réinitialisation';
    })
  }

  onSuccess() {
    this.snackBar.open('Réinitialisation a été effectuée avec succés', 'Fermer');
  }

}
