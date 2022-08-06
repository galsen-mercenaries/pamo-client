import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
const { SERVER_URL } = environment;
const MEETINGS_RESOURCES = `${SERVER_URL}/meetings`;

@Injectable({
  providedIn: "root",
})
export class MeetingService {
  constructor(private http: HttpClient) {}

  getUsersMeeting(ids): Observable<any> {
    const inclusionFilter = { 
      include: [
        {
          relation: "user"
        },
        {
          relation: "medecin",
          scope: {
            include: [
              {
                relation: "user"
              },
              {
                relation: "structuresanitaire"
              }
            ]
          }
        }
      ],
      where: { 
        userId: { 
          inq: ids
        } 
      } 
    };
    const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
    return this.http.get<any>(MEETINGS_RESOURCES + "?filter=" + encodedFilter);
  }
}
