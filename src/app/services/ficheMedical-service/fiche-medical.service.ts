import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FicheMedicalModel } from 'src/app/models/fiche-medical.model';
import { AuthenticationService } from "../authentication-service/authentication.service";

import { environment } from 'src/environments/environment';
const { SERVER_URL } = environment;

const FICHE_MEDICAL_ENDPOINT = `${SERVER_URL}/users`

@Injectable({
  providedIn: 'root'
})
export class FicheMedicalService {

  constructor(private http: HttpClient, private authServ: AuthenticationService) { }

  async registerFicheMedical(data: FicheMedicalModel) {
    const user = await this.authServ.getUserInfosSaved().toPromise();
    return this.http.post(`${FICHE_MEDICAL_ENDPOINT}/${user?.userId}/fichemedicale`, data);
  }
  async updateFicheMedical(data: FicheMedicalModel) {
    const user = await this.authServ.getUserInfosSaved().toPromise();
    return await this.http.patch(`${FICHE_MEDICAL_ENDPOINT}/${user?.userId}/fichemedicale`, data).toPromise();
  }
}
