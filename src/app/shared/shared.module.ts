import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, DatePipe, registerLocaleData } from "@angular/common";
import { EditFicheMedicalComponent } from "./components/edit-fiche-medical/edit-fiche-medical.component";
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgePipe } from "src/app/pipes/age.pipe";
import { DisplayDateGaugePipe } from "src/app/pipes/display-date-gauge.pipe";
import { SetDatetimeDialogComponent } from "./components/set-datetime-dialog/set-datetime-dialog.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { AppointmentInfosCardComponent } from "./components/appointment-infos-card/appointment-infos-card.component";
import { AppointmentConfirmationModalComponent } from "./components/appointment-confirmation-modal/appointment-confirmation-modal.component";
import localeFr from "@angular/common/locales/fr";
import { SetAppointmentNewDateModalComponent } from "./components/set-appointment-new-date-modal/set-appointment-new-date-modal.component";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PrevisualizeAvatarPopupComponent } from "./components/previsualize-avatar-popup/previsualize-avatar-popup.component";
import { MatIconModule } from "@angular/material/icon";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

registerLocaleData(localeFr, 'fr');
FullCalendarModule.registerPlugins([
    // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin,
    listPlugin
]);
@NgModule({
  declarations: [
    EditFicheMedicalComponent,
    AgePipe,
    DisplayDateGaugePipe,
    SetDatetimeDialogComponent,
    AppointmentInfosCardComponent,
    AppointmentConfirmationModalComponent,
    SetAppointmentNewDateModalComponent,
    PrevisualizeAvatarPopupComponent,
  ],
  entryComponents: [
    EditFicheMedicalComponent,
    SetDatetimeDialogComponent,
    PrevisualizeAvatarPopupComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    SwiperModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
  ],
  exports: [
    EditFicheMedicalComponent,
    AgePipe,
    DisplayDateGaugePipe,
    SetDatetimeDialogComponent,
    FullCalendarModule,
    AppointmentInfosCardComponent,
    AppointmentConfirmationModalComponent,
    PrevisualizeAvatarPopupComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
})
export class SharedModule {}
