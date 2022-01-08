import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "src/app/models/appointment.model";
import { AppointmentConfirmationModalComponent } from "../appointment-confirmation-modal/appointment-confirmation-modal.component";

@Component({
  selector: "app-appointment-infos-card",
  templateUrl: "./appointment-infos-card.component.html",
  styleUrls: ["./appointment-infos-card.component.scss"],
})
export class AppointmentInfosCardComponent implements OnInit {
  @Input() appointment: AppointmentModel;
  @Input() clickable: boolean;
  @Input() isPatient: boolean;
  APPOINTMENT_STATUS = APPOINTMENT_STATUS;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  validate() {
    if (!this.clickable) {
      return;
    }
    const dialogRef = this.dialog.open(AppointmentConfirmationModalComponent, {
      panelClass: "confirm-appointment-dialog",
      // backdropClass: "register-success-dialog-backdrop",
      data: {
        appointment: this.appointment,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
