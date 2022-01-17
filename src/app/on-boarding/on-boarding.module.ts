import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OnBoardingRoutingModule } from "./on-boarding-routing.module";
import { OnBoardingPageComponent } from "./pages/on-boarding-page/on-boarding-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import {
  SwiperConfigInterface,
  SwiperModule,
  SWIPER_CONFIG,
} from "ngx-swiper-wrapper";
import { NewsCardItemComponent } from "./components/news-card-item/news-card-item.component";
import { LoginFormDialogComponent } from "./components/login-form-dialog/login-form-dialog.component";
import { AutoCompleteModule } from "primeng/autocomplete";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

@NgModule({
  declarations: [
    OnBoardingPageComponent,
    NewsCardItemComponent,
    LoginFormDialogComponent,
  ],
  entryComponents: [LoginFormDialogComponent],
  imports: [
    CommonModule,
    OnBoardingRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    SwiperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AutoCompleteModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class OnBoardingModule {}
