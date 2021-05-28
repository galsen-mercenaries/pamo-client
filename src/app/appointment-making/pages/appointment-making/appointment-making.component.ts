import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AppointmentModel } from "src/app/models/appointment.model";
import { MedecinModel } from "src/app/models/medecin.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { AppointmentSuccessModalComponent } from "../../components/appointment-success-modal/appointment-success-modal.component";
import { SearchMedecinDialogComponent } from "../../components/search-medecin-dialog/search-medecin-dialog.component";

@Component({
  selector: "app-appointment-making",
  templateUrl: "./appointment-making.component.html",
  styleUrls: ["./appointment-making.component.scss"],
})
export class AppointmentMakingComponent implements OnInit {
  appointmentForm: FormGroup;
  medecin: MedecinModel;
  loading: boolean;
  todayDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private appointService: AppointmentService
  ) {}

  ngOnInit() {
    this.setAppointmentForm();
  }

  setAppointmentForm() {
    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      symptom: ["", Validators.required],
    });
  }

  openModalSelectMedecin() {
    const dialogRef = this.dialog.open(SearchMedecinDialogComponent, {
      panelClass: "search-doctor-modal",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.medecin) {
        this.medecin = result.medecin;
      }
    });
  }

  makeAppointment() {
    this.loading = false;
    const appointmentPayload: AppointmentModel = {
      nomPatient: "DOE",
      prenomPatient: "John",
      symptomes: this.appointmentForm.value.symptom,
      datePatient: this.appointmentForm.value.date,
      medecinId: this.medecin.medecinid,
      dateMedecin: this.appointmentForm.value.date,
      objet: "visite contre visite",
      type: "visite contre visite",
      notes: "visite contre visite",
      status: "visite contre visite",
    };
    this.appointService
      .fixAppointment(appointmentPayload)
      .pipe(
        tap(() => {
          this.loading = false;
          this.openSuccessModal();
        }),
        catchError((err) => {
          this.loading = false;
          return throwError(err);
        })
      )
      .subscribe();
  }

  openSuccessModal() {
    const dialogRef = this.dialog.open(AppointmentSuccessModalComponent, {
      panelClass: "register-success-dialog-style",
      // backdropClass: "register-success-dialog-backdrop",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
