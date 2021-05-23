import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FicheMedicalModel } from "src/app/models/fiche-medical.model";
import { UserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

const { SERVER_URL } = environment;
const USERS_RESOURCES = `${SERVER_URL}/users`;
const USER_FICHE_MEDICAL_INFOS_RESOURCES = `fichemedicale`;

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getUserFicheMedical(user: UserModel) {
    return this.http.get<FicheMedicalModel>(
      `${USERS_RESOURCES}/${user.userId}/${USER_FICHE_MEDICAL_INFOS_RESOURCES}`
    );
  }

  saveFicheMedicalInfos(user: UserModel, ficheInfos: FicheMedicalModel) {
    return this.http.post<FicheMedicalModel>(
      `${USERS_RESOURCES}/${user.userId}/${USER_FICHE_MEDICAL_INFOS_RESOURCES}`,
      ficheInfos
    );
  }

  updateFicheMedicalInfos(user: UserModel, ficheInfos: FicheMedicalModel) {
    return this.http.patch<FicheMedicalModel>(
      `${USERS_RESOURCES}/${user.userId}/${USER_FICHE_MEDICAL_INFOS_RESOURCES}`,
      ficheInfos
    );
  }
}
