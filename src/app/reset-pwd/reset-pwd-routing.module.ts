import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPwdFinishComponent } from './pages/reset-pwd-finish/reset-pwd-finish.component';
import { ResetPwdInitComponent } from './pages/reset-pwd-init/reset-pwd-init.component';

const routes: Routes = [
  {
    path: 'init',
    component: ResetPwdInitComponent
  },
  {
    path: 'finish',
    component: ResetPwdFinishComponent
  },
  {
    path: '',
    redirectTo: 'init'
  },
  {
    path: '**',
    redirectTo: 'init'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPwdRoutingModule { }
