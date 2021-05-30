import { Component, OnInit } from "@angular/core";
import { MatCalendarView } from "@angular/material";
import { DAYS_OF_WEEK } from "calendar-utils";
import { tap } from "rxjs/operators";
import { AppointmentService } from "src/app/services/medical-appointment/appointment.service";

@Component({
  selector: "app-medecin-dashboard-home",
  templateUrl: "./medecin-dashboard-home.component.html",
  styleUrls: ["./medecin-dashboard-home.component.scss"],
})
export class MedecinDashboardHomeComponent implements OnInit {
  view: MatCalendarView = "month";
  viewDate: Date = new Date();
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  weekEnds = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  daysDisplay = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
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
  appointments = [
    {
      firstName: "Papa Abdoulaye",
      lastName: "KEBE",
      time: "08:00",
      numero: "775896287",
      img: "https://picsum.photos/id/78/200",
    },
    {
      firstName: "Abdoul Karim",
      lastName: "DIOP",
      time: "09:00",
      numero: "781210942",
      img: "https://picsum.photos/id/133/200",
    },
    {
      firstName: "Matar",
      lastName: "FALL",
      time: "10:00",
      numero: "771234567",
      img: "https://picsum.photos/id/115/200",
    },
    {
      firstName: "Daouda",
      lastName: "DJIBA",
      time: "11:00",
      numero: "779876543",
      img: "https://picsum.photos/id/410/200",
    },
    {
      firstName: "Ibrahima",
      lastName: "GAKOU",
      time: "12:00",
      numero: "771298346",
      img: "https://picsum.photos/id/420/200",
    },
  ];
  constructor(private apptService: AppointmentService) {}

  ngOnInit() {
    this.getMedecinByAppointments();
  }

  getMedecinByAppointments() {
    this.apptService
      .getMedecinAppointmentsByDate()
      .pipe(
        tap((appointments) => {
          console.log(appointments);
        })
      )
      .subscribe();
  }

  onDayClicked(event) {
    console.log(event);
  }
}
