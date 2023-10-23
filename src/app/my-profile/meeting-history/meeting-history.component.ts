import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { MeetingService } from 'src/app/services/meeting-service/meeting.service';
import { UsersService } from 'src/app/services/user-service/users.service';
import { UserModel } from "src/app/models/user.model";
import { catchError, tap } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-history',
  templateUrl: './meeting-history.component.html',
  styleUrls: ['./meeting-history.component.scss']
})
export class MeetingHistoryComponent implements OnInit {
  linkedUsers: UserModel[];
  user: UserModel;
  usersId: Array<number> = []
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    "patient",
    "numero_patient",
    "docteur",
    "structure_sanitaire",
    "date_rv",
    "statut_rv"
  ]
  meetings
  constructor(
    private authServ : AuthenticationService,
    private meetingService : MeetingService,
    private userService : UsersService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  async getUser() {
    this.user = await this.authServ.getUserInfosSaved().toPromise();
    this.usersId.push(this.user.userId);
    this.getAllLinkedUsers(this.user);
    console.log(this.usersId);
  }

  getAllLinkedUsers(user) {
    this.userService
      .getLinkedUsers(user.userId)
      .pipe(
        tap((res) => {
          this.pushToArray(res)
          this.getMeeting(this.usersId)
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .toPromise();
  }
  getMeeting(usersId){
    this.meetingService.getUsersMeeting(usersId).subscribe(
      (res) =>{
        this.dataSource = res
        console.log(res)
      }
    )
  }

  pushToArray(data){
    data.forEach(e=>{
      console.log(e)
      this.usersId.push(e.userId);
    })
  }

  goBack() {
    this.router.navigate(["/dashboard/patient"]);
  }

}
