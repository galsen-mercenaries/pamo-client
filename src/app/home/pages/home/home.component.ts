import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  menuItems = [
    { menuTitle: "Accueil", subItems: [], router: "" },
    { menuTitle: "Assurances", subItems: [], router: "" },
    { menuTitle: "FAQ Santé", subItems: [], router: "" },
    { menuTitle: "Actualités", subItems: [], router: "" },
    { menuTitle: "Mes notifcations", subItems: [], router: "" },
  ];
  constructor() {}

  ngOnInit() {}
}
