import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
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
import { AppointmentSuccessModalComponent } from "./components/appointment-success-modal/appointment-success-modal.component";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
@NgModule({
  declarations: [
    AppointmentMakingComponent,
    SearchMedecinDialogComponent,
    AppointmentSuccessModalComponent,
  ],
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
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "fr-FR" }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppointmentMakingModule {}
