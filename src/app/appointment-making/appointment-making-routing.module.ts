import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentMakingComponent } from "./pages/appointment-making/appointment-making.component";

const routes: Routes = [
  {
    path: "",
    component: AppointmentMakingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentMakingRoutingModule {}
