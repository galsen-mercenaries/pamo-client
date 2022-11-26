import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentValidationComponent } from "../appointment-validation/appointment-validation/appointment-validation.component";
import { AuthGuardService } from "../services/auth-guard-service/auth-guard.service";
import { MedecinDashboardHomeComponent } from "./components/medecin-dashboard-home/medecin-dashboard-home.component";
import { MedecinsCalendarComponent } from "./components/medecins-calendar/medecins-calendar.component";
import { PatientDashboardHomeComponent } from "./components/patient-dashboard-home/patient-dashboard-home.component";
import { DashboardTamponComponent } from "./pages/dashboard-tampon/dashboard-tampon.component";
import { MedecinDashboardComponent } from "./pages/medecin-dashboard/medecin-dashboard.component";
import { PharmacieGardeComponent } from "./pages/patient-dashboard/components/pharmacie-garde/pharmacie-garde.component";
import { PatientDashboardComponent } from "./pages/patient-dashboard/patient-dashboard.component";

const routes: Routes = [
  { path: "", component: DashboardTamponComponent },
  {
    path: "patient",
    component: PatientDashboardComponent,
    // canActivate: [RoleGuard],
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
        path: "calendrier-medical",
        component: AppointmentValidationComponent,
      },
      {
        path: "pharmacies-garde",
        component: PharmacieGardeComponent,
      },
      {
        path: "prestataire",
        // canActivate: [AuthGuardService],
        loadChildren: () =>
          import(
            "../prestataires-structures-map/prestataires-structures-map.module"
          ).then((m) => m.PrestatairesStructuresMapModule),
      },
      {
        path: "appointment-making",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../appointment-making/appointment-making.module").then(
            (m) => m.AppointmentMakingModule
          ),
      },
      {
        path: "mon-profil",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../my-profile/my-profile.module").then(
            (m) => m.MyProfileModule
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
      {
        path: "calendar",
        component: MedecinsCalendarComponent,
      },
      {
        path: "rdv-confirmation",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import(
            "./../appointment-validation/appointment-validation.module"
          ).then((m) => m.AppointmentValidationModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import(
            "./pages/user-actions-medecins-page/user-actions-medecins-page.module"
          ).then((m) => m.UserActionsMedecinsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
