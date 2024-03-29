import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentMakingRoutingModule} from './appointment-making-routing.module';
import {AppointmentMakingComponent} from './pages/appointment-making/appointment-making.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchMedecinDialogComponent} from './components/search-medecin-dialog/search-medecin-dialog.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {AppointmentSuccessModalComponent} from './components/appointment-success-modal/appointment-success-modal.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
    declarations: [AppointmentMakingComponent, SearchMedecinDialogComponent, AppointmentSuccessModalComponent],
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
        NgxMatTimepickerModule
    ],
    providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppointmentMakingModule {}
