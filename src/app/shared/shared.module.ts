import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { EditFicheMedicalComponent } from "./components/edit-fiche-medical/edit-fiche-medical.component";
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgePipe } from "src/app/pipes/age.pipe";
import { DisplayDateGaugePipe } from "src/app/pipes/display-date-gauge.pipe";
import { SetDatetimeDialogComponent } from "./components/set-datetime-dialog/set-datetime-dialog.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
  timeGridPlugin,
  listPlugin
]);
@NgModule({
  declarations: [
    EditFicheMedicalComponent,
    AgePipe,
    DisplayDateGaugePipe,
    SetDatetimeDialogComponent,
  ],
  entryComponents: [EditFicheMedicalComponent, SetDatetimeDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [DatePipe, { provide: MAT_DIALOG_DATA, useValue: {} }],
  exports: [
    EditFicheMedicalComponent,
    AgePipe,
    DisplayDateGaugePipe,
    SetDatetimeDialogComponent,
    FullCalendarModule,
  ],
})
export class SharedModule {}
