import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard/auth-guard.service";
import { DashboardHomeComponent } from "./pages/dashboard-home/dashboard-home.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "appointment-making",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../appointment-making/appointment-making.module").then(
            (m) => m.AppointmentMakingModule
          ),
      },
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full",
      },
      {
        path: "welcome",
        component: DashboardHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
