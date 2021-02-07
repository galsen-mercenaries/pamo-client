import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { RegistrationMobileComponent } from "./components/registration-mobile/registration-mobile.component";
import { RegistrationDesktopComponent } from "./components/registration-desktop/registration-desktop.component";
import { SwiperModule } from "ngx-swiper-wrapper";
import { SWIPER_CONFIG } from "ngx-swiper-wrapper";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationMobileComponent,
    RegistrationDesktopComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class RegistrationModule {}
