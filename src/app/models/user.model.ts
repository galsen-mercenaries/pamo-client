export interface UserModel {
  nom: string;
  prenom: string;
  email: string;
  numero?: string;
  adresse?: string;
  password: string;
  role?: any;
  image?: string;
}

export enum ROLE_ENUM {
  PATIENT = "ROLE_USER",
  MEDECIN = "ROLE_MEDECIN",
}
