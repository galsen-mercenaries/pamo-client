import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./welcome/welcome.module").then((m) => m.WelcomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
