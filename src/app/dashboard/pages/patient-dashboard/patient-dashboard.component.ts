import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { PatientService } from "src/app/services/patient-service/patient.service";
import { PrevisualizeAvatarPopupComponent } from "src/app/shared/components/previsualize-avatar-popup/previsualize-avatar-popup.component";

@Component({
  selector: "app-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.scss"],
})
export class PatientDashboardComponent implements OnInit {
  menuItems = [
    {
      menuTitle: "Accueil",
      router: "home",
    },
    {
      menuTitle: "Calendrier Médical",
      router: "calendrier-medical",
    },
    { menuTitle: "Assurances", router: "prestataire" },
    { menuTitle: "Mon profil", router: "mon-profil" },
    { menuTitle: "Mes notifications", router: "4" },
  ];
  currentUser: UserModel;

  constructor(
    private authServ: AuthenticationService,
    public dialog: MatDialog,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserinfos();
    this.patientService
      .userUpdatedObservable()
      .pipe(
        tap((res) => {
          this.getUserinfos();
        })
      )
      .subscribe();
  }

  async getUserinfos() {
    this.currentUser = await this.authServ.getUserInfosSaved().toPromise();
    console.log(this.currentUser);
  }

  logout() {
    this.authServ.logout();
  }

  onFileUploaded(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.openPrevisualizeDialog(file);
    }
  }

  openPrevisualizeDialog(file) {
    const dialogRef = this.dialog.open(PrevisualizeAvatarPopupComponent, {
      data: { file },
      panelClass: ["previsualize-avatar-style"],
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  updateProfile() {
    this.router.navigate(["dashboard/patient/mon-profil"])
  }

  meetingHistory() {
    this.router.navigate(["dashboard/patient/mon-profil/meeting-history"])
  }

  addAnotherUser(){
    this.router.navigate(["dashboard/patient/mon-profil/linked-user"])
  }
}
