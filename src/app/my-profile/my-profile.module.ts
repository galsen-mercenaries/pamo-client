import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { LinkedUserComponent } from './linked-user/linked-user.component';
import { AddLinkedUserComponent } from './linked-user/add-linked-user/add-linked-user.component';
import { MatTableModule } from '@angular/material/table';
import { DeleteLinkedUserComponent } from './linked-user/component/delete-linked-user/delete-linked-user.component';
import { MeetingHistoryComponent } from './meeting-history/meeting-history.component';

@NgModule({
  declarations: [MyProfileComponent, LinkedUserComponent, AddLinkedUserComponent, DeleteLinkedUserComponent, MeetingHistoryComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class MyProfileModule {}
