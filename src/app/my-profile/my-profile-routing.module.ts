import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkedUserComponent } from './linked-user/linked-user.component';
import { MeetingHistoryComponent } from './meeting-history/meeting-history.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  {
    path: "",
    component: MyProfileComponent,
  },
  {
    path: "linked-user",
    component: LinkedUserComponent
  },
  {
    path: "meeting-history",
    component: MeetingHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
