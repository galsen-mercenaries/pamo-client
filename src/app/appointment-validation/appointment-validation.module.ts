import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentValidationRoutingModule} from './appointment-validation-routing.module';
import {AppointmentValidationComponent} from './appointment-validation/appointment-validation.component';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [AppointmentValidationComponent],
    imports: [CommonModule, AppointmentValidationRoutingModule, SharedModule, MatIconModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppointmentValidationModule {}
