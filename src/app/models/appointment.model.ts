import { MedecinModel } from "./medecin.model";

export interface AppointmentModel {
  objet?: string;
  type?: string;
  nomPatient?: string;
  prenomPatient?: string;
  numeroPatient?: string;
  symptomes?: string;
  notes?: string;
  status?: string;
  datePatient?: string;
  dateMedecin?: string;
  isApprovedByPatient?: boolean;
  isApprovedByMedecin?: boolean;
  patientId?: number;
  medecinId?: number;
  medecin?: MedecinModel;
  meetingId?: number;
  mailContact?: string;
}

export enum APPOINTMENT_STATUS {
  CANCELED = "CANCELED",
  CONFIRMED = "CONFIRMED",
  POSTPONED = "POSTPONED",
  PENDING = "PENDING",
  PERFORMED = "PERFORMED",
  EXPIRED = "EXPIRED",
  NOT_ANSWERED = "NOT_ANSWERED",
}

export enum APPOINTMENT_UPDATE_STATUS {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
