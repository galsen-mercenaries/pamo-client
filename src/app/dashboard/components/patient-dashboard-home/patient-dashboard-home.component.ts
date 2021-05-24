import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FicheMedicalModel } from "src/app/models/fiche-medical.model";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { PatientService } from "src/app/services/patient-service/patient.service";
import { EditFicheMedicalComponent } from "src/app/shared/shared/components/edit-fiche-medical/edit-fiche-medical.component";

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
        direction: "vertical",
        slidesPerView: 1.6,
      },
    },
  };
  currentUser: UserModel;
  userFicheMedical: FicheMedicalModel;
  loadingFiche: boolean;
  constructor(private router: Router, private patientServ: PatientService, private authServ: AuthenticationService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUser = this.authServ.getUserInfosSaved();
    this.getUserficheMedicalInfos();
  }
  goAppointment() {
    this.router.navigate(["/dashboard/patient/appointment-making"]);
  }

  getUserficheMedicalInfos() {
    this.loadingFiche = true;
    this.patientServ.getUserFicheMedical(this.currentUser).pipe(tap((res: FicheMedicalModel) => {
      this.loadingFiche = false;
      this.userFicheMedical = res;
    }), catchError((err: any) => {
      this.loadingFiche = false;
      return of(err)
    })).subscribe();
  }

  editFicheMedical() {
    this.matDialog.open(EditFicheMedicalComponent, {
      data: this.userFicheMedical,
      width: '350px'
    }).afterClosed().subscribe((res: 'EDIT'| 'CANCEL') => {
      if (res === 'EDIT') {
        this.getUserficheMedicalInfos()
      }
    })
  }
}
