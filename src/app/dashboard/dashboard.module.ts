import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { PatientDashboardComponent } from "./pages/patient-dashboard/patient-dashboard.component";
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PatientDashboardHomeComponent } from "./components/patient-dashboard-home/patient-dashboard-home.component";
import { MedecinDashboardHomeComponent } from "./components/medecin-dashboard-home/medecin-dashboard-home.component";
import { MedecinDashboardComponent } from "./pages/medecin-dashboard/medecin-dashboard.component";
import { CalendarModule } from "angular-calendar";
import { DashboardTamponComponent } from "./pages/dashboard-tampon/dashboard-tampon.component";
import { SharedModule } from "../shared/shared.module";
import {
  DlDateTimeDateModule,
  DlDateTimePickerModule,
} from "angular-bootstrap-datetimepicker";

@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientDashboardHomeComponent,
    MedecinDashboardComponent,
    MedecinDashboardHomeComponent,
    DashboardTamponComponent,
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
    MatProgressSpinnerModule,
    SharedModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DashboardModule {}
