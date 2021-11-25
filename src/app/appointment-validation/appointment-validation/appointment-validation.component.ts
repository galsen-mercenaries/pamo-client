import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CalendarOptions } from "@fullcalendar/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { getAppointmentClass, isEqualDate } from "src/app";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { AppointmentConfirmationModalComponent } from "src/app/shared/components/appointment-confirmation-modal/appointment-confirmation-modal.component";

@Component({
  selector: "app-appointment-validation",
  templateUrl: "./appointment-validation.component.html",
  styleUrls: ["./appointment-validation.component.scss"],
})
export class AppointmentValidationComponent implements OnInit {
  loadingRv;
  getRvHasError;
  appointments: AppointmentModel[];
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
  legends = [
    { color: "#34d57f", name: "Rendez-vous confirmé" },
    { color: "#47afff", name: "Rendez-vous en attente de validation" },
    { color: "#eeeeee", name: "Rendez-vous déjà effectué" },
    { color: "#ff0000", name: "Rendez-vous annulé" },
  ];
  constructor(
    private apptService: AppointmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMyAppointments();
  }

  confirmAppointment(appointment) {
    this.filteredAppointments = [appointment.event.extendedProps.eventObject];
    console.log(appointment.event.extendedProps.eventObject);
  }

  openDetails(appointment) {
    const dialogRef = this.dialog.open(AppointmentConfirmationModalComponent, {
      panelClass: "confirm-appointment-dialog",
      // backdropClass: "register-success-dialog-backdrop",
      data: {
        appointment: appointment.event.extendedProps.eventObject,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getFilteredInfos(date) {
    console.log(date);
    date = new Date(date.date);
    this.filteredAppointments = this.appointments.filter((x) =>
      this.isEqualDate(date, new Date(x.datePatient))
    );
    console.log(this.filteredAppointments);
  }

  isEqualDate(date1, date2) {
    return isEqualDate(date1, date2);
  }

  getMyAppointments() {
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
              title: x.type,
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
}
