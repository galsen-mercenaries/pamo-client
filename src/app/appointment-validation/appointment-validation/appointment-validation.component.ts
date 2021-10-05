import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { isEqualDate } from "src/app";
import { AppointmentModel } from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";

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
    dateClick: this.getFilteredInfos.bind(this), // bind is important!
    // eventClick: this.appointementsInfos.bind(this),
    events: [
      {
        title: "Meeting",
        start: "2019-08-12T14:30:00",
      },
      {
        title: "Birthday Party",
        start: "2019-08-13T07:00:00",
      },
    ],
  };
  filteredAppointments: AppointmentModel[];
  constructor(private apptService: AppointmentService) {}

  ngOnInit() {
    this.getMyAppointments();
  }

  getFilteredInfos(date) {
    // console.log(new Date(date.date));
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
              className: "event-meeting",
            };
          });
          this.appointments = appointments;
          // this.appointments = appointments.filter((x) =>
          //   this.isEqualDate(this.selectedDate, new Date(x.datePatient))
          // );
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
