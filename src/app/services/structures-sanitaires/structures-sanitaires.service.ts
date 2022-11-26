import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { SERVER_URL } = environment;
const STRUCTURES_RESOURCES = `${SERVER_URL}/structure-sanitaires`;

export enum TypePrestataire {
  PHARMACIE = "pharmacie",
}

@Injectable({
  providedIn: 'root'
})
export class StructuresSanitairesService {

  constructor(private http: HttpClient) { }

  getStructureSanitairesByType(type: string, skip: number, pageSize: number = 10, filterName?: string, filterAdresse?: string) {
    let inclusionFilter = {
      where: {
        typePrestataire: {
          eq: type
        }
      },
      limit: pageSize,
      skip: skip
    };
    if(filterName) {
      inclusionFilter.where = {...inclusionFilter.where,
       ...{
        nom: {
          regexp: `/${filterName?.trim()}/i`
        }
      }
      }
    }
    if(filterAdresse) {
      inclusionFilter.where = {...inclusionFilter.where,
       ...{
        adresse: {
          regexp: `/${filterAdresse?.trim()}/i`
        }
      }
      }
    }
    const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
    return this.http.get<any>(STRUCTURES_RESOURCES + "?filter=" + encodedFilter);
  }

  getStructureCountByType(type: string) {
    return this.http.get(STRUCTURES_RESOURCES + `/count?[where][typePrestataire]=${type}`);
  }
}
