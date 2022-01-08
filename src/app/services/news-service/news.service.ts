import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NewsModel } from "src/app/models/news.model";
import { environment } from "src/environments/environment";
const { SERVER_URL } = environment;
const NEWS_URL = `${SERVER_URL}/news`;
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
}
