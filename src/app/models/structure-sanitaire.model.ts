export interface StructureSanitaireModel {
  adresse?: string;
  code?: string;
  date_creation?: string;
  email?: string;
  is_actif?: boolean;
  is_all_night?: boolean;
  latitude?: number;
  longitude?: number;
  nom?: string;
  periodicityType?: PeriodicityType;
  structuresanitaireId?: number;
  typePrestataire?: string;
  ville?: string;
  watch_end_date?: string;
  watch_periodicity_value?: string;
  watch_start_date?: string;
}

const enum PeriodicityType {
  occurency='occurency', duration='duration'
}
