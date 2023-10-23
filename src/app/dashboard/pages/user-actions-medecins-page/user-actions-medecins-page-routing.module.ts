import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserActionsMedecinsPageComponent } from './components/user-actions-medecins-page/user-actions-medecins-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserActionsMedecinsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionsMedecinsPageRoutingModule { }
