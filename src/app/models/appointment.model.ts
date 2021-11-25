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
  meetingId?: number;
}

export enum APPOINTMENT_STATUS {
  CANCELED = "CANCELED",
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
}

export enum APPOINTMENT_UPDATE_STATUS {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
