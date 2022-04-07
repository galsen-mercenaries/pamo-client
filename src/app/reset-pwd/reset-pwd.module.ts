import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPwdRoutingModule } from './reset-pwd-routing.module';
import { ResetPwdInitComponent } from './pages/reset-pwd-init/reset-pwd-init.component';
import { ResetPwdFinishComponent } from './pages/reset-pwd-finish/reset-pwd-finish.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ResetPwdInitComponent, ResetPwdFinishComponent],
  imports: [
    CommonModule,
    ResetPwdRoutingModule,
    SharedModule
  ]
})
export class ResetPwdModule { }
