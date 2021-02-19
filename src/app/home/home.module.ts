import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { MatIconModule, MatMenuModule } from "@angular/material";
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [HomeComponent, DashboardHomeComponent],
  imports: [CommonModule, HomeRoutingModule, MatMenuModule, MatIconModule],
})
export class HomeModule {}
