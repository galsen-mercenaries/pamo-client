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
  ],
  providers: [DatePipe, { provide: MAT_DIALOG_DATA, useValue: {} }],
  exports: [
    EditFicheMedicalComponent,
    AgePipe,
    DisplayDateGaugePipe,
    SetDatetimeDialogComponent,
  ],
})
export class SharedModule {}
