import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard/auth-guard.service";
import { MedecinDashboardHomeComponent } from "./components/medecin-dashboard-home/medecin-dashboard-home.component";
import { PatientDashboardHomeComponent } from "./components/patient-dashboard-home/patient-dashboard-home.component";
import { MedecinDashboardComponent } from "./pages/medecin-dashboard/medecin-dashboard.component";
import { PatientDashboardComponent } from "./pages/patient-dashboard/patient-dashboard.component";

const routes: Routes = [
  {
    path: "patient",
    component: PatientDashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: PatientDashboardHomeComponent,
      },
      {
        path: "appointment-making",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../appointment-making/appointment-making.module").then(
            (m) => m.AppointmentMakingModule
          ),
      },
    ],
  },
  {
    path: "personnel",
    component: MedecinDashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: MedecinDashboardHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
