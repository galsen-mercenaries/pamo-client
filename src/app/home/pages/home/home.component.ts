import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  menuItems = [
    { menuTitle: "Nos Pharmacies", subItems: [], router: "" },
    { menuTitle: "Nos Hôpitaux", subItems: [], router: "" },
    { menuTitle: "Nos assureurs", subItems: [], router: "" },
    { menuTitle: "Nos Médecins", subItems: [], router: "" },
    { menuTitle: "Actualités", subItems: [], router: "" },
  ];
  constructor() {}

  ngOnInit() {}
}
