import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";

@Component({
  selector: "app-medecin-dashboard",
  templateUrl: "./medecin-dashboard.component.html",
  styleUrls: ["./medecin-dashboard.component.scss"],
})
export class MedecinDashboardComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
