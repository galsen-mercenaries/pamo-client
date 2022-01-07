import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { APPOINTMENTS_TEXTS } from "src/app";
import { AppointmentSuccessModalComponent } from "src/app/appointment-making/components/appointment-success-modal/appointment-success-modal.component";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
  APPOINTMENT_UPDATE_STATUS,
} from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { SetAppointmentNewDateModalComponent } from "../set-appointment-new-date-modal/set-appointment-new-date-modal.component";

@Component({
  selector: "app-appointment-confirmation-modal",
  templateUrl: "./appointment-confirmation-modal.component.html",
  styleUrls: ["./appointment-confirmation-modal.component.scss"],
})
export class AppointmentConfirmationModalComponent implements OnInit {
  APPOITMENT_STATUS = APPOINTMENT_STATUS;
  confirming: boolean;
  rejecting: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<AppointmentConfirmationModalComponent>,
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}

  confirm() {
    this.confirming = true;
    this.dialogRef.disableClose = true;
    this.data.appointment.status = APPOINTMENT_STATUS.CONFIRMED;
    this.data.appointment.dateMedecin = this.data.appointment.datePatient;
    this.appointmentService
      .updateAppointment(this.data.appointment)
      .pipe(
        tap((res) => {
          this.confirming = false;
          this.dialogRef.close(APPOINTMENT_UPDATE_STATUS.SUCCESS);
          this.openSuccessModal(APPOINTMENTS_TEXTS.MEDECIN_CONFIRM_SUCCESS);
        }),
        catchError((err) => {
          this.confirming = false;
          return throwError(err);
        })
      )
      .subscribe();
  }

  reject() {
    this.rejecting = true;
    this.dialogRef.disableClose = true;
  }

  postponeAppointment() {
    const dialogRef = this.dialog.open(SetAppointmentNewDateModalComponent, {
      panelClass: "confirm-appointment-dialog",
      // backdropClass: "register-success-dialog-backdrop",
      data: {
        appointment: this.data?.appointment,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  openSuccessModal(text) {
    const dialogRef = this.dialog.open(AppointmentSuccessModalComponent, {
      panelClass: "register-success-dialog-style",
      disableClose: true,
      data: {
        text,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
