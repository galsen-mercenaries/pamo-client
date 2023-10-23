import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FicheMedicalModel } from "src/app/models/fiche-medical.model";
import { UserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import * as SecureLS from "secure-ls";
import { LOCAL_STORAGE_KEYS } from "src/app";
import { LocalStorageService } from "../storage-sevice/local-storage.service";
const ls = new SecureLS({ encodingType: "aes" });

const { SERVER_URL } = environment;
const USERS_RESOURCES = `${SERVER_URL}/users`;
const USER_FICHE_MEDICAL_INFOS_RESOURCES = `fichemedicale`;

@Injectable({
  providedIn: "root",
})
export class PatientService {
  userUpdatedSubject = new Subject();

  constructor(private http: HttpClient, private lStorage: LocalStorageService) {}

  getUserFicheMedical(user: UserModel) {
    return this.http.get<FicheMedicalModel>(
      `${USERS_RESOURCES}/${user.userId}/${USER_FICHE_MEDICAL_INFOS_RESOURCES}`
    ).pipe(
      tap((res) => {
        this.lStorage.save(LOCAL_STORAGE_KEYS.USER+`${user.userId}`, res);
      }),
      catchError((err) => {
        const value = this.lStorage.getValue(LOCAL_STORAGE_KEYS.USER+`${user.userId}`);
        if(value) {
          return of(value)
        } else {
          return throwError(err);
        }
        // if(err?.error?.error?.statusCode === 404) {

        // }
      })
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

  userUpdatedObservable() {
    return this.userUpdatedSubject.asObservable();
  }

  // can be also used for medecin
  updateUserProfile(updatedUser) {
    return this.http
      .patch(`${USERS_RESOURCES}/${updatedUser.userId}`, updatedUser)
      .pipe(
        tap((res) => {
          ls.remove(LOCAL_STORAGE_KEYS.USER);
          this.userUpdatedSubject.next(true);
        })
      );
  }
}
