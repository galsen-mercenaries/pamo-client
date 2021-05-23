import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";

@Component({
  selector: "app-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.scss"],
})
export class PatientDashboardComponent implements OnInit {
  menuItems = [
    { menuTitle: "Accueil", subItems: [], router: "" },
    { menuTitle: "Assurances", subItems: [], router: "" },
    { menuTitle: "FAQ Santé", subItems: [], router: "" },
    { menuTitle: "Actualités", subItems: [], router: "" },
    { menuTitle: "Mes notifcations", subItems: [], router: "" },
  ];
  userInfos: UserModel;
  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserinfos();
  }

  async getUserinfos() {
    this.userInfos = await this.authServ.getUserInfos().toPromise();
  }

  logout() {
    this.authServ.logout();
    this.router.navigate(["/accueil"]);
  }
}
