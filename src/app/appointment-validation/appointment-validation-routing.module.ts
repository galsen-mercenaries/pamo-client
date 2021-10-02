import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentValidationComponent } from "./appointment-validation/appointment-validation.component";

const routes: Routes = [
  {
    path: "",
    component: AppointmentValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentValidationRoutingModule {}
