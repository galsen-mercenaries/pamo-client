import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication-service/authentication.service';

@Component({
    selector: 'app-registration-success-dialog',
    templateUrl: './registration-success-dialog.component.html',
    styleUrls: ['./registration-success-dialog.component.scss']
})
export class RegistrationSuccessDialogComponent implements OnInit {
    nom: string;
    email: string;
    password: string;
    signingIn: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialogRef<RegistrationSuccessDialogComponent>
    ) {}

    ngOnInit() {
        this.nom = this.data.prenom + ' ' + this.data.nom;
        this.email = this.data.email;
        this.password = this.data.password;
    }

    login() {
        this.signingIn = true;
        const loginPayload = {
            login: this.email,
            password: this.password
        };
        this.authenticationService.login(loginPayload).subscribe(
            () => {
                this.signingIn = false;
                this.dialog.close();
            },
            err => {
                this.signingIn = false;
                this.dialog.close();
                this.router.navigate(['/']);
            }
        );
    }

    goHome() {
        this.dialog.close();
        this.router.navigate(['/']);
    }
}
