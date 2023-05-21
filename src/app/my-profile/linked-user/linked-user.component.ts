import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { UsersService } from "src/app/services/user-service/users.service";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddLinkedUserComponent } from "./add-linked-user/add-linked-user.component";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteLinkedUserComponent } from "./component/delete-linked-user/delete-linked-user.component";
import { MeetingService } from "src/app/services/meeting-service/meeting.service";

@Component({
  selector: "app-linked-user",
  templateUrl: "./linked-user.component.html",
  styleUrls: ["./linked-user.component.scss"],
})
export class LinkedUserComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  linkedUsers: UserModel[];
  user: UserModel;
  usersId: Array<number> = []
  dataSource = new MatTableDataSource<UserModel>([]);
  displayedColumns: string[] = [
    "prenom",
    "nom",
    "email",
    "adresse",
    "numero",
    "relation",
    "actions",
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authServ: AuthenticationService,
    private userService: UsersService,
    private dialog: MatDialog,
    private meetingService : MeetingService
  ) {}

  ngOnInit(): void {
    this.getUser();
    //this.getAllLinkedUsers();
    //this.getMeeting();
  }

  goBack() {
    this.router.navigate(["/dashboard/patient"]);
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
          this.dataSource.data = res;
          this.pushToArray(res)
          console.log(this.usersId)
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .toPromise();
  }

  openModal() {
    const dialogRef = this.dialog.open(AddLinkedUserComponent, {
      data: this.user,
      width: "550px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllLinkedUsers(this.user);
    });
  }

  deleteLinkedUser(user, i) {
    const dialogRef = this.dialog.open(DeleteLinkedUserComponent, {
      data: user,
      width: "250px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllLinkedUsers(this.user);
    });
    console.log(user);
  }

  editLinkedUser(element, i) {
    console.log(element, i);
  }

  getMeeting(usersId){
    this.meetingService.getUsersMeeting(usersId).subscribe(
      (res) =>{
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
}
