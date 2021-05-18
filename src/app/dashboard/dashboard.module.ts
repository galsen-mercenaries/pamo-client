import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { PatientDashboardComponent } from "./pages/patient-dashboard/patient-dashboard.component";
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
} from "@angular/material";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PatientDashboardHomeComponent } from "./components/patient-dashboard-home/patient-dashboard-home.component";
import { MedecinDashboardHomeComponent } from "./components/medecin-dashboard-home/medecin-dashboard-home.component";
import { MedecinDashboardComponent } from "./pages/medecin-dashboard/medecin-dashboard.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientDashboardHomeComponent,
    MedecinDashboardComponent,
    MedecinDashboardHomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule,
    MatIconModule,
    SwiperModule,
    MatSidenavModule,
    MatListModule,
    CalendarModule,
  ],
})
export class DashboardModule {}
