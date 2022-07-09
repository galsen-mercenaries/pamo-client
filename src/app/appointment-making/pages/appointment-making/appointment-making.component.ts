import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { APPOINTMENTS_TEXTS } from "src/app";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "src/app/models/appointment.model";
import { MedecinModel } from "src/app/models/medecin.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { UsersService } from "src/app/services/user-service/users.service";
import { AppointmentSuccessModalComponent } from "../../components/appointment-success-modal/appointment-success-modal.component";
import { SearchMedecinDialogComponent } from "../../components/search-medecin-dialog/search-medecin-dialog.component";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { AddLinkedUserComponent } from "src/app/my-profile/linked-user/add-linked-user/add-linked-user.component";

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
  objects = [
    { name: "Alpha" },
    { name: "Beta" },
    { name: "Gamma" },
    { name: "Omega" },
  ];
  selectedObject;
  linkedUsers;
  user;
  selectedLinkedUser;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private appointService: AppointmentService,
    private usersService : UsersService,
    private authServ : AuthenticationService
  ) {}

  ngOnInit() {
    this.setAppointmentForm();
    this.getUser()
  }

  setAppointmentForm() {
    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      symptom: ["", Validators.required],
      options: ["1"],
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
    const user = this.appointmentForm.value.options === "1" ? this.user : this.selectedLinkedUser;
    
    const appointmentPayload: AppointmentModel = {
      nomPatient: user.nom,
      prenomPatient: user.prenom,
      numeroPatient: user.numero,
      symptomes: this.appointmentForm.value.symptom,
      datePatient: this.appointmentForm.value.date,
      medecinId: this.medecin.medecinid,
      objet: "Consultation",
      type: "Consultation",
      notes: "Consultation",
      status: APPOINTMENT_STATUS.PENDING,
    };
    this.appointService
      .fixAppointment(appointmentPayload, user.userId)
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
      data: {
        text: APPOINTMENTS_TEXTS.PATIENT,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getAllLinkedUsers(userId) {
    this.usersService
      .getLinkedUsers(userId)
      .pipe(
        tap((res) => {
          this.linkedUsers = res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .toPromise();
  }

  async getUser(){
    this.user = await this.authServ.getUserInfosSaved().toPromise();
    this.getAllLinkedUsers(this.user.userId);
  }

  createLinkedUser(){
    const dialogRef = this.dialog.open(AddLinkedUserComponent, {
      data: this.user,
      width: "550px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllLinkedUsers(this.user);
    });
  }

  radioChange(user){
    this.selectedLinkedUser = user;
    console.log(this.selectedLinkedUser)
  }
}
