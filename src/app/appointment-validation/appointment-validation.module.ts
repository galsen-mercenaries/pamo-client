import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentValidationRoutingModule } from './appointment-validation-routing.module';
import { AppointmentValidationComponent } from './appointment-validation/appointment-validation.component';


@NgModule({
  declarations: [AppointmentValidationComponent],
  imports: [
    CommonModule,
    AppointmentValidationRoutingModule
  ]
})
export class AppointmentValidationModule { }
