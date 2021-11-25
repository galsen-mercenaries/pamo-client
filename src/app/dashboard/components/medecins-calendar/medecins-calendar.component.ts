import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import { throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AppointmentModel } from "src/app/models/appointment.model";
import { SpecializationModel } from "src/app/models/specialization.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { UserModel } from "src/app/models/user.model";
import { MedecinService } from "src/app/services/medecin-service/medecin.service";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";

@Component({
  selector: "app-medecins-calendar",
  templateUrl: "./medecins-calendar.component.html",
  styleUrls: ["./medecins-calendar.component.scss"],
})
export class MedecinsCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    timeZone: "UTC",
    themeSystem: "bootstrap",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listMonth",
    },
    locale: "fr",
    buttonText: {
      today: "Aujourdh'hui",
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      list: "Liste",
    },
    dayMaxEvents: true, // allow "more" link when too many events
    // dateClick: this.appointementsInfos.bind(this), // bind is important!
    eventClick: this.appointementsInfos.bind(this),
    events: [],
  };
  infosAppointments: AppointmentModel;
  appointments: AppointmentModel[] = [];
  currentMedecin: {
    specialisations?: SpecializationModel[];
    user?: UserModel;
    structuresanitaire?: StructureSanitaireModel;
  };
  loadingRv: boolean;
  getRvHasError: boolean;
  constructor(
    private apptService: AppointmentService,
    private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.getMedecinAppointments();
    this.getMedecinInfos();
  }

  getMedecinInfos() {
    this.medecinService
      .getLoggedInMedecin()
      .pipe(
        map((res: any) => {
          res.specialisations = res.specialisations.map((spec) => spec.nom);
          return res;
        }),
        tap((medecin) => {
          this.currentMedecin = medecin;
        })
      )
      .subscribe();
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
              title: x.type,
              className: "event-meeting",
            };
          });
          this.appointments = appointments;
          this.calendarOptions.events = events;
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

  appointementsInfos(eventClick: any) {
    this.infosAppointments = this.appointments.find((x) => {
      return +x.meetingId === +eventClick.event.id;
    });
  }
}
