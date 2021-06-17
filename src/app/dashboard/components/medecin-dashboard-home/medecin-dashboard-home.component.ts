import { Component, OnInit } from "@angular/core";
import { MatCalendarView } from "@angular/material";
import { DAYS_OF_WEEK } from "calendar-utils";
import { catchError, map, tap } from "rxjs/operators";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";
import * as moment from "moment";
import { AppointmentModel } from "src/app/models/appointment.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { UserModel } from "src/app/models/user.model";
import { MedecinService } from "src/app/services/medecin-service/medecin.service";
import { SpecializationModel } from "src/app/models/specialization.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { isEqualDate } from "src/app";
import { throwError } from "rxjs";
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
  constructor(
    private apptService: AppointmentService,
    private authServ: AuthenticationService,
    private medecinService: MedecinService
  ) {}

  ngOnInit() {
    this.setMomentLocale();
    this.getMedecinAppointments();
    this.getMedecinInfos();
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
          this.appointments = appointments.filter((x) =>
            this.isEqualDate(this.selectedDate, new Date(x.datePatient))
          );
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

  onDateSelected(value) {
    this.selectedDate = value;
    this.getMedecinAppointments();
  }

  isEqualDate(date1, date2) {
    return isEqualDate(date1, date2);
  }
}
