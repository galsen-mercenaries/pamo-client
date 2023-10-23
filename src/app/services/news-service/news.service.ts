import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NewsModel } from "src/app/models/news.model";
import { PrestataireModel } from "src/app/models/prestataire.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication-service/authentication.service";
import { PatientService } from "../patient-service/patient.service";
const { SERVER_URL } = environment;
const NEWS_URL = `${SERVER_URL}/news`;
const PRESTATAIRES_URL = `${SERVER_URL}/prestataires`;
const STRUCTURES_URL = `${SERVER_URL}/structure-sanitaires`;
const FILES_URL = `${SERVER_URL}/files`;

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(
    private http: HttpClient,
    private userService: PatientService,
    private authService: AuthenticationService
  ) {}

  getNews() {
    return this.http.get<NewsModel[]>(NEWS_URL).pipe(
      map((res: NewsModel[]) => {
        return res.concat(res).concat(res);
      })
    );
  }

  getAllPrestataires() {
    return this.http.get<PrestataireModel[]>(PRESTATAIRES_URL);
  }

  getStructuresByPrestataires(prestataire: PrestataireModel) {
    return this.http.get<StructureSanitaireModel[]>(
      `${PRESTATAIRES_URL}/${prestataire.prestataireId}/structure-sanitaires`
    );
  }

  getAllStructures() {
    return this.http.get<StructureSanitaireModel[]>(`${STRUCTURES_URL}`);
  }

  uploadFile(fileFormData) {
    const userObservable = from(
      this.authService.getUserInfosSaved().toPromise()
    );
    return this.http.post(`${FILES_URL}`, fileFormData).pipe(
      switchMap((fileInfos: FileUploadedResponseModel) => {
        return userObservable.pipe(
          switchMap((user) => {
            const image = fileInfos.Location;
            const userPayload = { image, userId: user.userId };
            return this.userService.updateUserProfile(userPayload);
          })
        );
      })
    );
  }
}

export interface FileUploadedResponseModel {
  Bucket: string;
  ETag: string;
  Key: string;
  Location: string;
  key: string;
}
