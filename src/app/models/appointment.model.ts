export interface AppointmentModel {
  objet?: string;
  type?: string;
  nomPatient?: string;
  prenomPatient?: string;
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
