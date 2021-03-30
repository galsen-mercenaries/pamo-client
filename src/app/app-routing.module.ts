import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/accueil", pathMatch: "full" },
  {
    path: "accueil",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./welcome/welcome.module").then((m) => m.WelcomeModule),
  },
  {
    path: "dashboard",
    canActivate: [AuthGuardService],
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
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
