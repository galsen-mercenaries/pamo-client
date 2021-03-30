import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NewsModel } from "src/app/models/news.model";
import { environment } from "src/environments/environment";
const { SERVER_URL } = environment;
const NEWS_URL = `${SERVER_URL}/api/news`;
@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get<NewsModel[]>(NEWS_URL).pipe(
      map((res: NewsModel[]) => {
        const a = res[0];
        return [a, a, a, a, a, a, a, a, a];
      })
    );
  }
}
