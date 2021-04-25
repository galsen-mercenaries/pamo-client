import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppointmentMakingRoutingModule } from "./appointment-making-routing.module";
import { AppointmentMakingComponent } from "./pages/appointment-making/appointment-making.component";
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MAT_DATE_LOCALE,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchMedecinDialogComponent } from "./components/search-medecin-dialog/search-medecin-dialog.component";
import { SwiperModule } from "ngx-swiper-wrapper";

@NgModule({
  declarations: [AppointmentMakingComponent, SearchMedecinDialogComponent],
  entryComponents: [SearchMedecinDialogComponent],
  imports: [
    CommonModule,
    AppointmentMakingRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    SwiperModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "fr-FR" }],
})
export class AppointmentMakingModule {}
