import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { SERVER_URL } = environment;
const USERS_RESOURCES = `${SERVER_URL}/users`;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsersCount() {
    const inclusionFilter = {
      where: {roleId: 4 } // only select user having role = ROLE_USER with roleId: 5
    }
    return this.http.get(USERS_RESOURCES + '/count?[where][roleId]=4');
  }

  getUsers(options?: {limit: any, skip: any, orderBy?: 'ASC' | 'DESC'}) {
    const inclusionFilter = {
      include: [
        {
          relation: "role",
        },
        {
          relation: "fichemedicale",
        }
      ],
      where: {roleId: 5}, // only select user having role = ROLE_USER with roleId: 5
      limit: options?.limit,
      skip: options?.skip,
      order: `nom ${options?.orderBy ? options?.orderBy : 'ASC'}`,
    }
  const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
    return this.http.get<any>(
      USERS_RESOURCES + '?filter='+encodedFilter );
  }
}
