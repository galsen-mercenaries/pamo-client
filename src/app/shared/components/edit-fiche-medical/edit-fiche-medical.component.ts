import {DatePipe} from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FicheMedicalModel} from 'src/app/models/fiche-medical.model';

@Component({
    selector: 'app-edit-fiche-medical',
    templateUrl: './edit-fiche-medical.component.html',
    styleUrls: ['./edit-fiche-medical.component.scss']
})
export class EditFicheMedicalComponent implements OnInit {
    form: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FicheMedicalModel,
        public dialogRef: MatDialogRef<EditFicheMedicalComponent>,
        private fb: FormBuilder,
        private date: DatePipe
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            poids: [this.data.poids, [Validators.required]],
            taille: new FormControl({value: this.data.taille, disabled: true}),
            sexe: [this.data.sexe],
            dateNaissance: [this.date.transform(this.data.date_naissance, 'yyyy-MM-dd')],
            groupeSanguin: [this.data.groupe_sanguin],
            maladies: [this.data.maladies],
            contactUrgents: [this.data.contact_urgence]
        });
    }

    onSubmit() {}

    close() {
        this.dialogRef.close('CANCEL');
    }
}
