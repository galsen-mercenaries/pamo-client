import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from "@angular/material";

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    WelcomeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class WelcomeModule {}
