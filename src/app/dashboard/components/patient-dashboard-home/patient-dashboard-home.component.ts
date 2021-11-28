import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import {
  MAP_MONTHS_EN_TO_FR,
  MAP_DAYS_EN_TO_FR,
  getAppointmentClass,
} from "src/app";
import { AppointmentModel } from "src/app/models/appointment.model";
import { FicheMedicalModel } from "src/app/models/fiche-medical.model";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import { PatientService } from "src/app/services/patient-service/patient.service";
import { EditFicheMedicalComponent } from "src/app/shared/components/edit-fiche-medical/edit-fiche-medical.component";
import { CalendarOptions } from "@fullcalendar/angular";

@Component({
  selector: "app-patient-dashboard-home",
  templateUrl: "./patient-dashboard-home.component.html",
  styleUrls: ["./patient-dashboard-home.component.scss"],
})
export class PatientDashboardHomeComponent implements OnInit {
  appointments = [
    { date: "Lun 1 Avr", percent: 0 },
    { date: "Mer 10 Avr", percent: 100 / 3 },
    { date: "Jeu 18 Avr", percent: 60 },
    { date: "Mar 30 Avr", percent: 100 },
  ];
  images = [
    "/assets/images/healthy-food.jpg",
    "/assets/images/sports.jpg",
    "/assets/images/mask.jpg",
  ];
  swiperConfig: SwiperConfigInterface = {
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: true,
    loop: true,
    speed: 1200,
    spaceBetween: 10,
    breakpoints: {
      200: {
        direction: "horizontal",
        slidesPerView: 1,
        pagination: true,
      },
      470: {
        direction: "horizontal",
        slidesPerView: 1.45,
      },
      690: {
        direction: "horizontal",
        slidesPerView: 1.3,
      },
    },
  };
  currentUser: UserModel;
  userFicheMedical: FicheMedicalModel;
  loadingFiche: boolean;
  userAppointments: AppointmentModel[] = [];
  currentDayOfMonth: number;
  endDayOfMonth: number;
  calendarOptions: CalendarOptions = {
    timeZone: "UTC",
    headerToolbar: {
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
    // dateClick: this.appointementsInfos.bind(this), // bind is important!
    // eventClick: this.appointementsInfos.bind(this),
    events: [],
  };
  constructor(
    private router: Router,
    private patientServ: PatientService,
    private appointmentService: AppointmentService,
    private authServ: AuthenticationService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserinfos();
    this.getDatesOfMonth();
    this.getUserAppointments();
  }

  async getUserinfos() {
    this.currentUser = await this.authServ.getUserInfosSaved().toPromise();
    this.getUserficheMedicalInfos();
  }

  getUserAppointments() {
    this.appointmentService
      .getUserAppointments()
      .pipe(
        map((res: AppointmentModel[]) => {
          const events: any[] = res.map((x) => {
            return {
              id: x.meetingId,
              start: x.datePatient,
              title: x.type,
              className: ["event-meeting", getAppointmentClass(x)],
              eventObject: x,
            };
          });
          this.calendarOptions.events = events;
          const response = res.filter((appointment) =>
            this.isAppointmentInCurrentMonth(appointment)
          );
          return response;
        }),
        tap((res: AppointmentModel[]) => {
          this.userAppointments = res;
        })
      )
      .subscribe();
  }

  isAppointmentInCurrentMonth(appointment?: AppointmentModel) {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1),
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const appointDate = new Date(appointment.datePatient);
    return appointDate <= lastDay && appointDate >= firstDay;
  }

  getDatesOfMonth() {
    const date = new Date();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDayOfMonth = +date.toLocaleDateString("fr-FR").split("/")[0];
    this.endDayOfMonth = +endDate.toLocaleDateString("fr-FR").split("/")[0];
  }

  // this method returns the day in which the appointment is scheduled
  // for input "2021-05-28T00:00:00.000Z" it returns 28
  // then estimate the percent width on the gauge
  getAppointmentDay(appt: AppointmentModel) {
    const apptDay = +new Date(appt.datePatient).toString().split(" ")[2];
    return (apptDay * 100) / this.endDayOfMonth;
  }

  goAppointment() {
    this.router.navigate(["/dashboard/patient/appointment-making"]);
  }

  getUserficheMedicalInfos() {
    this.loadingFiche = true;
    this.patientServ
      .getUserFicheMedical(this.currentUser)
      .pipe(
        tap((res: FicheMedicalModel) => {
          this.loadingFiche = false;
          this.userFicheMedical = res;
        }),
        catchError((err: any) => {
          this.loadingFiche = false;
          return of(err);
        })
      )
      .subscribe();
  }

  editFicheMedical() {
    this.matDialog
      .open(EditFicheMedicalComponent, {
        data: this.userFicheMedical,
        width: "350px",
      })
      .afterClosed()
      .subscribe((res: "EDIT" | "CANCEL") => {
        if (res === "EDIT") {
          this.getUserficheMedicalInfos();
        }
      });
  }
}
