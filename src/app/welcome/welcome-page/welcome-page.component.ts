import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onWindowScroll(e) {
    if (e.target.scrollTop > 70) {
      let element = document.getElementById("header");
      element.classList.add("header-sticky");
    } else {
      let element = document.getElementById("header");
      element.classList.remove("header-sticky");
    }
  }
}
