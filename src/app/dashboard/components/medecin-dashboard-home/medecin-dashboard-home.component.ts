import { Component, OnInit } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import * as moment from "moment";
import { AppointmentModel } from "src/app/models/appointment.model";
import { UserModel } from "src/app/models/user.model";
import { MedecinService } from "src/app/services/medecin-service/medecin.service";
import { SpecializationModel } from "src/app/models/specialization.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { isEqualDate } from "src/app";
import { throwError } from "rxjs";
import { CalendarOptions } from "@fullcalendar/angular";

@Component({
  selector: "app-medecin-dashboard-home",
  templateUrl: "./medecin-dashboard-home.component.html",
  styleUrls: ["./medecin-dashboard-home.component.scss"],
})
export class MedecinDashboardHomeComponent implements OnInit {
  notifications = [
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
    {
      title: "Rendez-vous",
      content:
        "Vous avez une demande de rendez-vous en attente. Merci de consulter dans les plus brefs délais.",
      date: "il y a 5 min",
    },
  ];
  appointments: AppointmentModel[] = [];
  loadingRv: boolean;
  getRvHasError: boolean;
  currentMedecin: {
    specialisations?: SpecializationModel[];
    user?: UserModel;
    structuresanitaire?: StructureSanitaireModel;
  };
  selectedDate = new Date();
  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    locale: 'fr',
    dayMaxEvents: true, // allow "more" link when too many events
    // dateClick: this.appointementsInfos.bind(this), // bind is important!
    eventClick: this.appointementsInfos.bind(this),
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
  infosAppointments: AppointmentModel;

  constructor(
    private apptService: AppointmentService,
    private medecinService: MedecinService
  ) {}

  ngOnInit() {
    this.setMomentLocale();
    this.getMedecinAppointments();
    this.getMedecinInfos();
  }

  handleDateClick(arg) {
    console.log(arg);

    // alert('date click! ' + arg.dateStr)
  }

  setMomentLocale() {
    moment.locale("fr", {
      week: { dow: 1 },
      monthsShort:
        "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
          "_"
        ),
      weekdaysMin: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    });
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
              title: x.type
            }
          }
          );
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
      return +x.meetingId === +eventClick.event.id
    })
  }

  onDateSelected(value) {
    this.selectedDate = value;
    this.getMedecinAppointments();
  }

  isEqualDate(date1, date2) {
    return isEqualDate(date1, date2);
  }
}
