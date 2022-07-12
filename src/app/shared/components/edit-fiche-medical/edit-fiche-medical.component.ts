import {DatePipe} from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FicheMedicalModel} from 'src/app/models/fiche-medical.model';
import { FicheMedicalService } from 'src/app/services/ficheMedical-service/fiche-medical.service';

@Component({
    selector: 'app-edit-fiche-medical',
    templateUrl: './edit-fiche-medical.component.html',
    styleUrls: ['./edit-fiche-medical.component.scss']
})
export class EditFicheMedicalComponent implements OnInit {
    form: FormGroup;
    user: any;
    hasError: boolean;
    listGroupeSanguin: string[] = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    ]
    isMedecin: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { ficheMedical: FicheMedicalModel, update: boolean, isMedecin: boolean, userId: number},
        public dialogRef: MatDialogRef<EditFicheMedicalComponent>,
        private fb: FormBuilder,
        private date: DatePipe,
        private ficheMedical: FicheMedicalService
    ) {}

    ngOnInit(): void {
        this.isMedecin = this.data.isMedecin;
        this.form = this.fb.group({
            poids: [this.data?.ficheMedical?.poids, [Validators.required]],
            taille: [this.data?.ficheMedical?.taille, [Validators.required]],
            sexe: [this.data?.ficheMedical?.sexe],
            date_naissance: [this.date.transform(this.data?.ficheMedical?.date_naissance, 'yyyy-MM-dd')],
            groupe_sanguin: [this.data?.ficheMedical?.groupe_sanguin],
            maladies: [this.data?.ficheMedical?.maladies ],
            allergies: [this.data?.ficheMedical?.allergies ],
            traitements_anterieurs: [this.data?.ficheMedical?.traitements_anterieurs ],
            contact_urgence: [this.data?.ficheMedical?.contact_urgence ? this.data?.ficheMedical?.contact_urgence: '']
        });
    }

    async onSubmit() {
        console.log('this.form', this.form.value);
        // this.user = this.authServ.getUserInfos().toPromise();
        const data: FicheMedicalModel = this.form.value;
        data.date_naissance = new Date(data.date_naissance);
        this.hasError = false;
        if(!data?.groupe_sanguin) delete data?.groupe_sanguin;
        if(!data?.maladies) delete data?.maladies;
        if(this.data?.update) {
            this.ficheMedical.updateFicheMedical(data, this.data?.userId).then(
                () => {
                    this.dialogRef.close(data);
                }
            ).catch(
                () => {
                    this.hasError = true;
                }
            );
        } else {
            this.ficheMedical.registerFicheMedical(data, this.data?.userId).then(
                () => {
                    this.dialogRef.close(data);
                }
            ).catch(
                () => {
                    this.hasError = true;
                }
            )
        }
    }

    close() {
        this.dialogRef.close();
    }
}
