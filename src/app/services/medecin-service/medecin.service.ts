import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { MedecinFiltersEnum } from "src/app/enums/medecin-filters.enum";
import { MedecinModel } from "src/app/models/medecin.model";
import { SpecializationModel } from "src/app/models/specialization.model";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication-service/authentication.service";
const { SERVER_URL } = environment;
const MEDECIN_URL = `${SERVER_URL}/medecins`;
const MEDECIN_BY_SPECIALITY_URL = `${SERVER_URL}/`;
const SPECIALITIES_URL = `${SERVER_URL}/specialisations`;

@Injectable({
  providedIn: "root",
})
export class MedecinService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllMedecins(filters?: string[]) {
    let queryParams = "?";
    if (filters?.length) {
      filters.forEach((filter, index) => {
        queryParams += `filter[include][${index}]=${filter}&`;
      });
    }
    return this.http.get<MedecinModel[]>(`${MEDECIN_URL}${queryParams}`).pipe(
      // just to get random images for display (to remove in the future to display real profile picture)
      map((res) => {
        res.forEach((medecin) => {
          const randomImgNum = this.generateRandomNumber();
          if(medecin.user) {
            medecin.user.image = `https://picsum.photos/id/${randomImgNum}/200`;
          }
        });
        return res;
      })
    );
  }

  getLoggedInMedecin(
    filters = [
      MedecinFiltersEnum.SPECIALITES,
      MedecinFiltersEnum.STRUCTURE,
      MedecinFiltersEnum.USER,
    ]
  ) {
    let queryParams = "?";
    if (filters?.length) {
      filters.forEach((filter, index) => {
        queryParams += `filter[include][${index}]=${filter}&`;
      });
    }
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((loggedMed) => {
        const { medecinId } = loggedMed;
        return this.http.get(`${MEDECIN_URL}/${medecinId}${queryParams}`);
      })
    );
  }

  generateRandomNumber() {
    return (
      Math.round(Math.random() * 10) * 80 +
      Math.round(Math.random() * 10) * 9 +
      Math.round(Math.random() * 10)
    );
  }

  getMedecinsBySpeciality() {
    return this.http.get<any[]>(MEDECIN_BY_SPECIALITY_URL);
  }

  getAllSpecialities() {
    return this.http.get<SpecializationModel[]>(SPECIALITIES_URL);
  }
}
