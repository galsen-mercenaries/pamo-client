import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppointmentModel } from "src/app/models/appointment.model";
import { AuthenticationService } from "../authentication-service/authentication.service";
import { switchMap } from "rxjs/operators";
const { SERVER_URL } = environment;
const APPOINTMENT_MAKING_BY_PATIENT_URL = `${SERVER_URL}/patients`;
const GET_MEDECIN_APPOINTMENT_URL = `${SERVER_URL}/medecins`;
const APPOINTMENT_BASE_URL = `${SERVER_URL}/meetings`;

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  updateAppointment(appointment: AppointmentModel) {
    appointment.numeroPatient = "msisdn";
    return this.http.put(
      `${APPOINTMENT_BASE_URL}/${appointment.meetingId}`,
      appointment
    );
  }

  fixAppointment(payload: AppointmentModel) {
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        const { userId, prenom, nom } = userInfos;
        payload.patientId = userId;
        payload.numeroPatient = "775896287";
        payload.nomPatient = payload.nomPatient ? payload.nomPatient : nom;
        payload.prenomPatient = payload.prenomPatient
          ? payload.prenomPatient
          : prenom;
        return this.http.post<any>(
          `${APPOINTMENT_MAKING_BY_PATIENT_URL}/${userId}/meetings`,
          payload
        );
      })
    );
  }

  getUserAppointments() {
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        const { userId } = userInfos;
        return this.http.get<AppointmentModel[]>(
          `${APPOINTMENT_MAKING_BY_PATIENT_URL}/${userId}/meetings`
        );
      })
    );
  }

  getMedecinAppointmentsByDate(date?: string, filters?: string[]) {
    let queryParams = "?";
    if (filters?.length) {
      filters.forEach((filter, index) => {
        queryParams += `filter[include][${index}]=${filter}&`;
      });
    }
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        const { medecinId } = userInfos;
        return this.http.get<AppointmentModel[]>(
          `${GET_MEDECIN_APPOINTMENT_URL}/${medecinId}/meetings${queryParams}`
        );
      })
    );
  }
}
