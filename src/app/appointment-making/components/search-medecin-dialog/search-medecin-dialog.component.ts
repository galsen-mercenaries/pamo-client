import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { SwiperComponent, SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-search-medecin-dialog",
  templateUrl: "./search-medecin-dialog.component.html",
  styleUrls: ["./search-medecin-dialog.component.scss"],
})
export class SearchMedecinDialogComponent implements OnInit {
  doctors = [
    {
      name: "Seydou Amar",
      speciality: "gynecologue",
      district: "Hopital Fann",
      img: "https://picsum.photos/id/110/200",
    },
    {
      name: "Alpha Balde",
      speciality: "pediatre",
      district: "Albert Royer",
      img: "https://picsum.photos/id/221/200",
    },
    {
      name: "Saliou Diop",
      speciality: "dentiste",
      district: "Clinique Mame Abdou",
      img: "https://picsum.photos/id/376/200",
    },
    {
      name: "Karim Diop",
      speciality: "gynecologue",
      district: "HED",
      img: "https://picsum.photos/id/428/200",
    },
    {
      name: "Matar Fall",
      speciality: "pediatre",
      district: "Dalal Jaam",
      img: "https://picsum.photos/id/159/200",
    },
    {
      name: "Demba Faye",
      speciality: "dentiste",
      district: "Clinique Osef",
      img: "https://picsum.photos/id/596/200",
    },
    {
      name: "Mar Gueye",
      speciality: "gynecologue",
      district: "CHET",
      img: "https://picsum.photos/id/677/200",
    },
    {
      name: "Sidi Ndong",
      speciality: "pediatre",
      district: "Welcome Hosto",
      img: "https://picsum.photos/id/982/200",
    },
    {
      name: "Aissata Ly",
      speciality: "dentiste",
      district: "DENTORA",
      img: "https://picsum.photos/id/91/200",
    },
    {
      name: "Mame Penda Sy",
      speciality: "gynecologue",
      district: "Dalal Jaam",
      img: "https://picsum.photos/id/107/200",
    },
    {
      name: "Ibrahima Sarr",
      speciality: "pediatre",
      district: "CS de Kebemer",
      img: "https://picsum.photos/id/811/200",
    },
    {
      name: "Mor Talla KEBE",
      speciality: "dentiste",
      district: "Clinique MTK",
      img: "https://picsum.photos/id/112/200",
    },
    {
      name: "Aziz Gakou",
      speciality: "gynecologue",
      district: "Hopital de Yoff",
      img: "https://picsum.photos/id/613/200",
    },
    {
      name: "Coly Sane",
      speciality: "pediatre",
      district: "Ngaparou Health",
      img: "https://picsum.photos/id/164/200",
    },
    {
      name: "Ahmed Mbaye",
      speciality: "dentiste",
      district: "Clinique Mame Abdou",
      img: "https://picsum.photos/id/515/200",
    },
    {
      name: "Modou Wane",
      speciality: "gynecologue",
      district: "Clinique Osef",
      img: "https://picsum.photos/id/126/200",
    },
    {
      name: "Alima Wade",
      speciality: "pediatre",
      district: "HED",
      img: "https://picsum.photos/id/197/200",
    },
    {
      name: "Zahra Fatima Diallo",
      speciality: "dentiste",
      district: "Hopital de Dakar",
      img: "https://picsum.photos/id/187/200",
    },
  ];
  specialities = [
    { name: "Ophtalmologue" },
    { name: "Dentiste" },
    { name: "Neurologue" },
    { name: "Gynécologue" },
  ];
  swiperConfig: SwiperConfigInterface = {
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: false,
    loop: false,
    slidesPerView: 1,
  };
  @ViewChild("swiper", { static: false }) swiper: SwiperComponent;
  currentTabIndex = 0;
  constructor(private matDialog: MatDialogRef<SearchMedecinDialogComponent>) {}

  ngOnInit(): void {}

  goTab(index: number) {
    this.swiper.directiveRef.setIndex(index);
  }

  onIndexChanged(event) {
    console.log(event);
    this.currentTabIndex = event;
  }

  chooseMedecin(medecin) {
    this.matDialog.close({ medecin });
  }
}
