import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}
}
