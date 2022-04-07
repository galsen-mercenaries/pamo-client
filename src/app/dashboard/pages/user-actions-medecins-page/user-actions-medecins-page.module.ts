import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActionsMedecinsPageRoutingModule } from './user-actions-medecins-page-routing.module';
import { UserActionsMedecinsPageComponent } from './components/user-actions-medecins-page/user-actions-medecins-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListUsersComponent } from './components/list-users/list-users.component';


@NgModule({
  declarations: [UserActionsMedecinsPageComponent, ListUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserActionsMedecinsPageRoutingModule
  ],
  providers: [
  ]
})
export class UserActionsMedecinsPageModule { }
