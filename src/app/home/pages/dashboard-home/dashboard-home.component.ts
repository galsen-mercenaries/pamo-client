import { Component, OnInit } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { SWIPER_CONFIGURATION } from "src/app";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"],
})
export class DashboardHomeComponent implements OnInit {
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
    direction: "vertical",
    slidesPerView: 1.6,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: true,
    loop: true,
    speed: 1200,
    spaceBetween: 10,
  };
  constructor() {}

  ngOnInit(): void {}
}
