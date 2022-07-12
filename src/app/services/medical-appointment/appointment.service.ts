import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  AppointmentModel,
  APPOINTMENT_STATUS,
} from "src/app/models/appointment.model";
import { AuthenticationService } from "../authentication-service/authentication.service";
import { map, switchMap } from "rxjs/operators";
const { SERVER_URL } = environment;
const APPOINTMENT_MAKING_BY_PATIENT_URL = `${SERVER_URL}/users`;
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

  fixAppointment(payload: AppointmentModel, userId) {
    console.log(payload)
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        return this.http.post<any>(
          `${APPOINTMENT_MAKING_BY_PATIENT_URL}/${userId}/meetings`,
          payload
        );
      })
    );
  }

  checkAppointmentExpired(appointment: AppointmentModel) {
    const today = new Date();
    const appointmentDate = new Date(appointment.datePatient);
    if (
      appointment.status === APPOINTMENT_STATUS.PENDING &&
      today > appointmentDate
    ) {
      appointment.dateMedecin
        ? (appointment.status = APPOINTMENT_STATUS.EXPIRED)
        : (appointment.status = APPOINTMENT_STATUS.NOT_ANSWERED);
    } else if (
      appointment.status === APPOINTMENT_STATUS.CONFIRMED &&
      today > appointmentDate
    ) {
      appointment.status = APPOINTMENT_STATUS.PERFORMED;
    } else if (
      appointment.status === APPOINTMENT_STATUS.PENDING &&
      appointment.dateMedecin &&
      appointment.datePatient
    ) {
      appointment.status = APPOINTMENT_STATUS.POSTPONED;
    }
  }

  getUserAppointments() {
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        const { userId } = userInfos;
        return this.http
          .get<AppointmentModel[]>(
            `${APPOINTMENT_MAKING_BY_PATIENT_URL}/${userId}/meetings?filter={"include":[{"relation":"medecin","scope": {"include": [{"relation": "user"}] } }]}`
          )
          .pipe(
            map((res) => {
              res.forEach((appointment) => {
                this.checkAppointmentExpired(appointment);
              });
              return res;
            })
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
        return this.http
          .get<AppointmentModel[]>(
            `${GET_MEDECIN_APPOINTMENT_URL}/${medecinId}/meetings${queryParams}`
          )
          .pipe(
            map((res) => {
              res.forEach((appointment) => {
                this.checkAppointmentExpired(appointment);
              });
              return res;
            })
          );
      })
    );
  }
}
