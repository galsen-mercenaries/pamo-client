import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-medecin-dashboard",
  templateUrl: "./medecin-dashboard.component.html",
  styleUrls: ["./medecin-dashboard.component.scss"],
})
export class MedecinDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToMyCalender() {
    this.router.navigate(["/dashboard/personnel/rdv-confirmation"]);
  }
}
