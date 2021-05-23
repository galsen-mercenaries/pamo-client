import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/accueil", pathMatch: "full" },
  {
    path: "accueil",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./on-boarding/on-boarding.module").then(
        (m) => m.OnBoardingModule
      ),
  },
  {
    path: "dashboard",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "register",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
