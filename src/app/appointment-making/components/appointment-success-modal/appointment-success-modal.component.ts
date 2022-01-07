import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-appointment-success-modal',
    templateUrl: './appointment-success-modal.component.html',
    styleUrls: ['./appointment-success-modal.component.scss']
})
export class AppointmentSuccessModalComponent implements OnInit {
    constructor(
        public router: Router,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialogRef<AppointmentSuccessModalComponent>
    ) {}

    ngOnInit(): void {}

    goHome() {
        this.dialog.close();
        this.router.navigate(['/dashboard']);
    }
}
