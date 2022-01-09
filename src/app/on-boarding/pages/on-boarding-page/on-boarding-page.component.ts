import { Component, OnInit, ViewChild } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { Router } from "@angular/router";
import { SwiperComponent } from "ngx-swiper-wrapper";
import { tap } from "rxjs/operators";
import { SWIPER_CONFIGURATION } from "src/app";
import { PrestataireModel } from "src/app/models/prestataire.model";
import { NewsService } from "src/app/services/news-service/news.service";
import { LoginFormDialogComponent } from "../../components/login-form-dialog/login-form-dialog.component";

@Component({
    selector: 'app-on-boarding-page',
    templateUrl: './on-boarding-page.component.html',
    styleUrls: ['./on-boarding-page.component.scss']
})
export class OnBoardingPageComponent implements OnInit {
  swiperConfig = SWIPER_CONFIGURATION;
  news = [];
  prestataire: PrestataireModel;
  prestataires: PrestataireModel[];
  prestatairesSuggestions: PrestataireModel[];
  @ViewChild("swiper", { static: false }) swiper: SwiperComponent;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.getNews();
    this.getPrestataires();
  }

  getPrestataires() {
    this.newsService
      .getAllPrestataires()
      .pipe(
        tap((prestataires) => {
          this.prestataires = [...prestataires];
          console.log(this.prestataires);
        })
      )
      .subscribe();
  }

  onWindowScroll(e) {
    if (e.target.documentElement.scrollTop > 25) {
      let element = document.getElementById("header");
      element.classList.add("header-sticky");
    } else {
      let element = document.getElementById("header");
      element.classList.remove("header-sticky");
    }
  }

  goPageRegister() {
    this.router.navigate(["/register"]);
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

  getNews() {
    this.newsService.getNews().subscribe((news) => {
      this.news = news;
    });
  }

  onCompleted(ev) {
    this.prestatairesSuggestions = this.prestataires.filter((prestataire) => {
      return prestataire.nom.toLowerCase().includes(ev?.query.toLowerCase());
    });
  }

  seePrestataireDetails() {
    this.router.navigate(["/prestataire"], {
      state: { prestataire: this.prestataire },
    });
  }
}
