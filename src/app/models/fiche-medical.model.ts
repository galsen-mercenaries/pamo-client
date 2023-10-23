import { UserModel } from "./user.model";

export interface FicheMedicalModel {
  date_naissance: Date;
  groupe_sanguin: any;
  sexe: any;
  maladies: any;
  allergies: any;
  traitements_anterieurs: any;
  poids: any;
  taille: any;
  contact_urgence: any;
  user?: UserModel;
}
