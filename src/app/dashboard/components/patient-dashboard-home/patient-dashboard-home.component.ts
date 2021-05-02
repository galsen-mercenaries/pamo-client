import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-patient-dashboard-home",
  templateUrl: "./patient-dashboard-home.component.html",
  styleUrls: ["./patient-dashboard-home.component.scss"],
})
export class PatientDashboardHomeComponent implements OnInit {
  appointments = [
    { date: "Lun 1 Avr", percent: 0 },
    { date: "Mer 10 Avr", percent: 100 / 3 },
    { date: "Jeu 18 Avr", percent: 60 },
    { date: "Mar 30 Avr", percent: 100 },
  ];
  images = [
    "/assets/images/healthy-food.jpg",
    "/assets/images/sports.jpg",
    "/assets/images/mask.jpg",
  ];
  swiperConfig: SwiperConfigInterface = {
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: true,
    loop: true,
    speed: 1200,
    spaceBetween: 10,
    breakpoints: {
      200: {
        direction: "horizontal",
        slidesPerView: 1,
        pagination: true,
      },
      470: {
        direction: "horizontal",
        slidesPerView: 1.45,
      },
      690: {
        direction: "vertical",
        slidesPerView: 1.6,
      },
    },
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goAppointment() {
    this.router.navigate(["/dashboard/patient/appointment-making"]);
  }
}
