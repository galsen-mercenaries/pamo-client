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

  async registerFicheMedical(data: FicheMedicalModel, userId?: number) {
    const user = await this.authServ.getUserInfosSaved().toPromise();
    return await this.http.post(`${FICHE_MEDICAL_ENDPOINT}/${userId ? userId : user?.userId}/fichemedicale`, data).toPromise();
  }
  async updateFicheMedical(data: FicheMedicalModel, userId?: number) {
    const user = await this.authServ.getUserInfosSaved().toPromise();
    return await this.http.patch(`${FICHE_MEDICAL_ENDPOINT}/${userId ? userId : user?.userId}/fichemedicale`, data).toPromise();
  }
}
