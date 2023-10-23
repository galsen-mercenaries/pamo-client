import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/user-service/users.service';


@Component({
  selector: 'app-delete-linked-user',
  templateUrl: './delete-linked-user.component.html',
  styleUrls: ['./delete-linked-user.component.scss']
})
export class DeleteLinkedUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<DeleteLinkedUserComponent>,
    private usersService : UsersService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteLinkedUser(){
    // this.data.userIdLinked = -1
    this.usersService.updateLinkedUsers(this.data).subscribe(
      (res) => {
        this.goBack()
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  goBack(){
    this.dialog.close();
  }

  decline(){
    console.log("Donnéees Test")
  }

}
