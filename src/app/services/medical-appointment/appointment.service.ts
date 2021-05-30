import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppointmentModel } from "src/app/models/appointment.model";
import { AuthenticationService } from "../authentication-service/authentication.service";
import { switchMap } from "rxjs/operators";
const { SERVER_URL } = environment;
const APPOINTMENT_MAKING_BY_PATIENT_URL = `${SERVER_URL}/patients`;
const GET_MEDECIN_APPOINTMENT_URL = `${SERVER_URL}/medecins`;

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  fixAppointment(payload: AppointmentModel) {
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        const { userId } = userInfos;
        payload.patientId = userId;
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

  getMedecinAppointmentsByDate() {
    return this.authenticationService.getUserInfosSaved().pipe(
      switchMap((userInfos) => {
        console.log(userInfos);

        const { userId } = userInfos;
        return this.http.get<AppointmentModel[]>(
          `${GET_MEDECIN_APPOINTMENT_URL}/${userId}/meetings`
        );
      })
    );
  }
}
