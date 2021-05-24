import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditFicheMedicalComponent } from './components/edit-fiche-medical/edit-fiche-medical.component';
import { MatButtonModule, MatDialogModule, MatDialogRef, MatFormFieldModule, MatGridListModule, MatInputModule, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from 'src/app/pipes/age.pipe';



@NgModule({
  declarations: [EditFicheMedicalComponent, AgePipe
  ],
  entryComponents: [EditFicheMedicalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
  ],
  providers: [DatePipe, {provide: MAT_DIALOG_DATA, useValue: {}}],
  exports: [EditFicheMedicalComponent, AgePipe
  ]
})
export class SharedModule { }
