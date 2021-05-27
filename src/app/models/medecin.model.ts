import { StructureSanitaireModel } from "./structure-sanitaire.model";
import { UserModel } from "./user.model";

export interface MedecinModel {
  medecinid?: number;
  structuresanitaire?: StructureSanitaireModel;
  structuresanitaireId?: number;
  user?: UserModel;
  userId?: number;
}
