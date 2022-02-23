import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { tap } from "rxjs/operators";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";

@Component({
  selector: "app-set-appointment-new-date-modal",
  templateUrl: "./set-appointment-new-date-modal.component.html",
  styleUrls: ["./set-appointment-new-date-modal.component.scss"],
})
export class SetAppointmentNewDateModalComponent implements OnInit {
  todayDate = new Date();
  form: FormGroup;
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SetAppointmentNewDateModalComponent>,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [
        new Date(this.data?.appointment?.datePatient),
        Validators.required,
      ],
      reason: [null],
    });
  }

  postpone() {
    this.loading = true;
    this.dialogRef.disableClose = true;
    const appointment: AppointmentModel = this.data.appointment;
    delete appointment.medecin;
    if (this.data.isPatient) {
      delete appointment.dateMedecin;
      appointment.datePatient = this.form.value.date;
    } else {
      appointment.dateMedecin = this.form.value.date;
    }
    appointment.status = APPOINTMENT_STATUS.PENDING;
    this.appointmentService
      .updateAppointment(appointment)
      .pipe(
        tap((res) => {
          this.loading = false;
          this.dialogRef.close("res");
        })
      )
      .subscribe();
  }
}
