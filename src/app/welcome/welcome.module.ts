import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from "@angular/material";
import { NewsCardItemComponent } from "./components/news-card-item/news-card-item.component";
import { SwiperModule } from "ngx-swiper-wrapper";
import { SWIPER_CONFIG } from "ngx-swiper-wrapper";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { LoginFormDialogComponent } from "./components/login-form-dialog/login-form-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};
@NgModule({
  declarations: [
    WelcomePageComponent,
    NewsCardItemComponent,
    LoginFormDialogComponent,
  ],
  entryComponents: [LoginFormDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SwiperModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class WelcomeModule {}
