import { FicheMedicalModel } from "./fiche-medical.model";
import { SpecializationModel } from "./specialization.model";

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
  userIdLinked?: number;
  roleCode?: string;
  medecinId?: number;
  structuresanitaireId?: number;
  fichemedicale?: FicheMedicalModel;
  specialite?: SpecializationModel;
}

export enum ROLE_ENUM {
  PATIENT = "ROLE_USER",
  MEDECIN = "ROLE_MEDECIN",
}
