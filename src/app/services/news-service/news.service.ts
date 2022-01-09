import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NewsModel } from "src/app/models/news.model";
import { PrestataireModel } from "src/app/models/prestataire.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { environment } from "src/environments/environment";
const { SERVER_URL } = environment;
const NEWS_URL = `${SERVER_URL}/news`;
const PRESTATAIRES_URL = `${SERVER_URL}/prestataires`;
@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private http: HttpClient) {}

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
}
