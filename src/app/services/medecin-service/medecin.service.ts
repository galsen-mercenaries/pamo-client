import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
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
  constructor(private http: HttpClient) {}

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
          medecin.user.image = `https://picsum.photos/id/${randomImgNum}/200`;
        });
        return res;
      })
    );
  }

  generateRandomNumber() {
    return Math.random() * 800 + Math.random() * 90 + Math.random() * 10;
  }

  getMedecinsBySpeciality() {
    return this.http.get<any[]>(MEDECIN_BY_SPECIALITY_URL);
  }

  getAllSpecialities() {
    return this.http.get<SpecializationModel[]>(SPECIALITIES_URL);
  }
}
