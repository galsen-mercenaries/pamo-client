import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StructuresByPrestatairesComponent } from "./pages/structures-by-prestataires/structures-by-prestataires.component";

const routes: Routes = [
  { path: "", component: StructuresByPrestatairesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestatairesStructuresMapRoutingModule {}
