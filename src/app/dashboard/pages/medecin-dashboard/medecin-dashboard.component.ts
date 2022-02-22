import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { tap } from "rxjs/operators";
import { SpecializationModel } from "src/app/models/specialization.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { MedecinService } from "src/app/services/medecin-service/medecin.service";
import { PatientService } from "src/app/services/patient-service/patient.service";
import { PrevisualizeAvatarPopupComponent } from "src/app/shared/components/previsualize-avatar-popup/previsualize-avatar-popup.component";

@Component({
  selector: "app-medecin-dashboard",
  templateUrl: "./medecin-dashboard.component.html",
  styleUrls: ["./medecin-dashboard.component.scss"],
})
export class MedecinDashboardComponent implements OnInit {
  currentMedecin: {
    specialisations?: SpecializationModel[];
    user?: UserModel;
    structuresanitaire?: StructureSanitaireModel;
  };

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private medecinService: MedecinService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.getMedecinInfos();
    this.patientService
      .userUpdatedObservable()
      .pipe(
        tap((res) => {
          this.getMedecinInfos();
        })
      )
      .subscribe();
  }

  getMedecinInfos() {
    this.medecinService
      .getLoggedInMedecin()
      .pipe(
        tap((medecin) => {
          this.currentMedecin = medecin;
          console.log(medecin);
        })
      )
      .subscribe();
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

  logout() {
    this.authService.logout();
  }
}
