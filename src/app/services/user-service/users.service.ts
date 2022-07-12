import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheMedicalModel } from 'src/app/models/fiche-medical.model';
import { environment } from 'src/environments/environment';
const { SERVER_URL } = environment;
const USERS_RESOURCES = `${SERVER_URL}/users`;
const FICHE_MEDICALES_RESOURCES = `${SERVER_URL}/fichemedicales`;
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

  getLinkedUsers(userId, options?: {limit: any, skip: any, orderBy?: 'ASC' | 'DESC'}) {
    const inclusionFilter = {
      where: {userIdLinked: userId}, // only select user having role = ROLE_USER with roleId: 5
      limit: options?.limit,
      skip: options?.skip,
      order: `nom ${options?.orderBy ? options?.orderBy : 'ASC'}`,
    }
  const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
    return this.http.get<any>(
      USERS_RESOURCES+'?filter='+encodedFilter );
  }

  updateLinkedUsers(user) {
    const url = USERS_RESOURCES+"/"+user.userId
    return this.http.put<any>(url,user);
  }

  addLinkedUsers(user):Observable<any>{
    const url = USERS_RESOURCES
    return this.http.post<any>(url, user)
  }

  getUsersByFilter(filter?: {filterType: 'gSanguin' | 'genre' | 'poids' | 'birthdate', value: any} ,options?: {limit: any, skip: any, orderBy?: 'ASC' | 'DESC'}) {
    const whereFilter = {where : {}};
    switch (filter?.filterType) {
      case 'gSanguin':
        whereFilter.where = Object.assign({}, {groupe_sanguin: filter.value});
        break;
      case 'genre':
        whereFilter.where = Object.assign({}, {sexe: filter.value});
        break;
      case 'poids':
        whereFilter.where = Object.assign({}, {poids: {gte : +filter.value}});
        break;
      case 'birthdate':
        whereFilter.where = Object.assign({}, {date_naissance: {gte: filter.value}});
        break;
      default:
        break;
    }

    const inclusionFilter = {
      include: [
        {
          relation: "user",
          scope: {
            where: { roleId: 5}, // only select order with id 5
          }
        }
      ],
      ...whereFilter,
      limit: options?.limit,
      skip: options?.skip,
    }
  const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
    return this.http.get<FicheMedicalModel[]>(
      FICHE_MEDICALES_RESOURCES + '?filter='+encodedFilter ).pipe(map((resp: FicheMedicalModel[]) => {
        const ficheMedicales: FicheMedicalModel[] = resp.filter((item: FicheMedicalModel) => item?.user);
        return ficheMedicales.map((item: FicheMedicalModel) => {
          return {...item.user, fichemedicale: item}
        })
      }));
  }
}
