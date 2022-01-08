import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";

@Component({
  selector: "app-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.scss"],
})
export class PatientDashboardComponent implements OnInit {
  menuItems = [
    {
      menuTitle: "Accueil",
      subItems: [],
      router: "home",
    },
    {
      menuTitle: "Calendrier Médical",
      subItems: [],
      router: "calendrier-medical",
    },
    { menuTitle: "Assurances", subItems: [], router: "1" },
    { menuTitle: "Actualités", subItems: [], router: "3" },
    { menuTitle: "Mes notifcations", subItems: [], router: "4" },
  ];
  currentUser: UserModel;

  constructor(private authServ: AuthenticationService) {}

  ngOnInit() {
    this.getUserinfos();
  }

  async getUserinfos() {
    this.currentUser = await this.authServ.getUserInfosSaved().toPromise();
  }

  logout() {
    this.authServ.logout();
  }
}
