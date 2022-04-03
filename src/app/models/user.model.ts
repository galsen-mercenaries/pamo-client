import { FicheMedicalModel } from "./fiche-medical.model";

export interface UserModel {
  userId?: number;
  nom: string;
  prenom: string;
  email: string;
  numero?: string;
  adresse?: string;
  password: string;
  role?: any;
  image?: string;
  roleCode?: string;
  medecinId?: number;
  structuresanitaireId?: number;
  fichemedicale?: FicheMedicalModel;
}

export enum ROLE_ENUM {
  PATIENT = "ROLE_USER",
  MEDECIN = "ROLE_MEDECIN",
}
