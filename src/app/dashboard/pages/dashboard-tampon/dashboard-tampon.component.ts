import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";

@Component({
  selector: "app-dashboard-tampon",
  templateUrl: "./dashboard-tampon.component.html",
  styleUrls: ["./dashboard-tampon.component.scss"],
})
export class DashboardTamponComponent implements OnInit {
  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserinfos();
  }

  async getUserinfos() {
    const userInfos = await this.authServ.getUserInfosSaved().toPromise();
    if (!userInfos) {
      // handle error cases
    }
    const role = userInfos?.role?.code;
    switch (role) {
      case "ROLE_USER":
        this.router.navigate(["/dashboard/patient/home"]);
        break;
      case "ROLE_MEDECIN":
        this.router.navigate(["/dashboard/personnel/home"]);
        break;
      default:
        this.router.navigate(["/dashboard/patient/home"]);
        break;
    }
  }
}
