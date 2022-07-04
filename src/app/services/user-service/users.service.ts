import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication-service/authentication.service';
const { SERVER_URL } = environment;
const USERS_RESOURCES = `${SERVER_URL}/users`;
const MEDECIN_RESOURCES = `${SERVER_URL}/medecins`;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getUsersCount() {
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

  getMyPatientFromMeeting() {
    const inclusionFilter = {
      include: [
        {
          relation: "user",
          scope: {
            include: [{
              relation: "fichemedicale"
            }],
          }
        }
      ],
      where: { userId: { neq :  null } }
    }

  const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
  return this.authenticationService.getUserInfosSaved().pipe(
    switchMap((loggedMed) => {
      const { medecinId } = loggedMed;
      return this.http.get(`${MEDECIN_RESOURCES}/${medecinId}/meetings`+'?filter='+encodedFilter).pipe(
        map((itemList: AppointmentModel[]) => {
          return itemList.map((elt: AppointmentModel) => elt?.user)
        })
      );
    }));
  }

  getUserByFicheMedicalFilter(filter?: {filterType: 'gSanguin' | 'genre' | 'poids' | 'birthdate', value: any}) {
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
            include: [{
              relation: "fichemedicale",
              scope: {
                ...whereFilter
              }
            }],
          }
        }
      ],
      where: { userId: { neq :  null } }
    }

  const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));

    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((loggedMed) => {
        const { medecinId } = loggedMed;
        return this.http.get(`${MEDECIN_RESOURCES}/${medecinId}/meetings`+'?filter='+encodedFilter).pipe(
          map((itemList: AppointmentModel[]) => {
            const itemListFiltered = itemList.filter((x) => {
              return x?.user?.fichemedicale;
            })
            console.log('item',itemListFiltered);

            return itemListFiltered.map((elt: AppointmentModel) => {
              return elt?.user
            })
          })
        );
      }));
  }
}
