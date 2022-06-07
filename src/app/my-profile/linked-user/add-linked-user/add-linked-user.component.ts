import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserModel } from "src/app/models/user.model";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from 'src/app/services/user-service/users.service';

@Component({
  selector: 'app-add-linked-user',
  templateUrl: './add-linked-user.component.html',
  styleUrls: ['./add-linked-user.component.scss']
})
export class AddLinkedUserComponent implements OnInit {
  form: FormGroup;
  user: UserModel;
  errorMsg: String ="Erreur lors de l'ajout de l'utilisateur"
  error: number = 0

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<AddLinkedUserComponent>,
    private usersService : UsersService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.initForm()
  }

  async initForm() {
    this.form = this.fb.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]]
    });
  }

  add(){
    var value = this.form.value;
    value["userIdLinked"] = this.data.userId
    value["roleId"] = 5
    console.log(value)
    this.usersService.addLinkedUsers(value).subscribe(
      (res) =>{
        console.log(res)
        this.goBack()
      },
      (err)=>{
        this.error = 1
        console.log(err)
      }
    )
  }
  goBack(){
    this.dialog.close()
  }

}
