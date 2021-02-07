import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SwiperComponent, SwiperDirective } from "ngx-swiper-wrapper";
import { SWIPER_CONFIGURATION } from "src/app";
import { LoginFormDialogComponent } from "../../components/login-form-dialog/login-form-dialog.component";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  swiperConfig = SWIPER_CONFIGURATION;
  news = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @ViewChild("swiper", { static: false }) swiper: SwiperComponent;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onWindowScroll(e) {
    if (e.target.documentElement.scrollTop > 25) {
      let element = document.getElementById("header");
      element.classList.add("header-sticky");
    } else {
      let element = document.getElementById("header");
      element.classList.remove("header-sticky");
    }
  }

  nextSlide() {
    this.swiper.directiveRef.nextSlide();
  }

  previousSlide() {
    this.swiper.directiveRef.prevSlide();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginFormDialogComponent, {
      panelClass: "login-form-style",
      backdropClass: "login-dialog-backdrop",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
