import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnBoardingPageComponent } from "./pages/on-boarding-page/on-boarding-page.component";

const routes: Routes = [{ path: "", component: OnBoardingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBoardingRoutingModule {}
