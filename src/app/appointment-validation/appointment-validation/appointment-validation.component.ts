import { Component, OnInit } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { Router } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/core";
import { throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { getAppointmentClass } from "src/app";
import {
  AppointmentModel,
} from "src/app/models/appointment.model";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { UsersService } from "src/app/services/user-service/users.service";
import { AppointmentConfirmationModalComponent } from "src/app/shared/components/appointment-confirmation-modal/appointment-confirmation-modal.component";

@Component({
    selector: 'app-appointment-validation',
    templateUrl: './appointment-validation.component.html',
    styleUrls: ['./appointment-validation.component.scss']
})
export class AppointmentValidationComponent implements OnInit {
  loadingRv;
  getRvHasError;
  appointments: AppointmentModel[];
  isPatient: boolean;
  calendarOptions: CalendarOptions = {
    timeZone: "UTC",
    headerToolbar: {
      // right: "dayGridMonth,dayGridWeek",
      right: "prev,next",
    },
    locale: "fr",
    buttonText: {
      today: "Aujourdh'hui",
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      list: "Liste",
    },
    dayMaxEvents: 2, // allow "more" link when too many events
    moreLinkContent: "voir plus",
    moreLinkClassNames: "more-link",
    // dateClick: this.getFilteredInfos.bind(this), // bind is important!
    eventClick: this.openDetails.bind(this),
    events: [],
  };
  filteredAppointments: AppointmentModel[];
  linkedUsers: UserModel[];
  legends = [
    { color: "#ffadc7", name: "Rendez-vous confirmé" },
    { color: "#34d57f", name: "Rendez-vous déjà effectué" },
    { color: "#47afff", name: "Rendez-vous en attente de validation" },
    { color: "#e6e6db", name: "Rendez-vous expiré" },
    { color: "#e5e9ec", name: "Rendez-vous ignoré" },
    { color: "#ff0000", name: "Rendez-vous annulé" },
    { color: "orange", name: "Rendez-vous décalé" },
  ];
  constructor(
    private apptService: AppointmentService,
    private dialog: MatDialog,
    private router: Router,
    private usersService : UsersService,
    private authServ: AuthenticationService
  ) {}

  ngOnInit() {
    this.getCurrentRoute();
    this.getLinkedUsers();
  }

  getCurrentRoute() {
    const route = this.router.url;
    if (route.match("personnel/rdv-confirmation")) {
      this.getMedecinAppointments();
      return;
    }
    this.isPatient = true;
    this.getPatientAppointments();
  }

  async getLinkedUsers() {
    const user = await this.authServ.getUserInfosSaved().toPromise();
    this.usersService
      .getLinkedUsers(user.userId)
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

  onUserChanged(userId) {
    console.log(userId);
    this.getPatientAppointments(userId)
  }

  openDetails(appointment) {
    const dialogRef = this.dialog.open(AppointmentConfirmationModalComponent, {
      panelClass: "confirm-appointment-dialog",
      // backdropClass: "register-success-dialog-backdrop",
      data: {
        appointment: appointment.event.extendedProps.eventObject,
        isPatient: this.isPatient,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getMedecinAppointments() {
    this.loadingRv = true;
    this.getRvHasError = false;
    this.appointments = [];
    this.apptService
      .getMedecinAppointmentsByDate()
      .pipe(
        tap((appointments) => {
          const events: any[] = appointments.map((x) => {
            return {
              id: x.meetingId,
              start: x.datePatient,
              title: x.prenomPatient + " " + x.nomPatient,
              className: ["event-meeting", getAppointmentClass(x)],
              eventObject: x,
            };
          });
          this.appointments = appointments;
          this.calendarOptions.events = events;
          this.loadingRv = false;
        }),
        catchError((err) => {
          this.loadingRv = false;
          this.getRvHasError = true;
          return throwError(err);
        })
      )
      .subscribe();
  }

  getPatientAppointments(userId?) {
    this.loadingRv = true;
    this.getRvHasError = false;
    this.appointments = [];
    this.apptService
      .getUserAppointments(userId)
      .pipe(
        map((res: AppointmentModel[]) => {
          const events: any[] = res.map((x) => {
            return {
              id: x.meetingId,
              start: x.datePatient,
              title:
                "Docteur " +
                x?.medecin?.user?.prenom +
                " " +
                x?.medecin?.user?.nom,
              className: ["event-meeting", getAppointmentClass(x)],
              eventObject: x,
            };
          });
          this.calendarOptions.events = events;
          return res;
        }),
        tap((res: AppointmentModel[]) => {
          this.appointments = res;
          this.loadingRv = false;
        }),
        catchError((err) => {
          this.loadingRv = false;
          this.getRvHasError = true;
          return throwError(err);
        })
      )
      .subscribe();
  }

  goBack() {
    const route = this.isPatient ? '/' : 'dashboard/personnel'
    this.router.navigate([route]);
  }
}
