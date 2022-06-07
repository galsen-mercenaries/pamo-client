import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { switchMap, tap } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication-service/authentication.service";
import { PatientService } from "src/app/services/patient-service/patient.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  updating: boolean;
  user: UserModel;

  constructor(
    private authServ: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.loading = true;
    this.user = await this.authServ.getUserInfosSaved().toPromise();
    this.loading = false;
    this.form = this.fb.group({
      prenom: [this.user.prenom],
      nom: [this.user.nom],
      adresse: [this.user.adresse],
      numero: [this.user.numero],
      email: [this.user.email],
    });
  }

  update() {
    this.updating = true;
    const payload = this.form.value;
    payload["userId"] = this.user.userId;
    this.patientService
      .updateUserProfile(payload)
      .pipe(
        switchMap(_ => {
          return this.authServ.getUserInfosSaved();
        }),
        tap((res) => {
          this.updating = false;
          this.goBack();
          console.log(res);
        })
      )
      .subscribe();
  }

  goBack() {
    this.router.navigate(["/dashboard/patient"]);
  }
}
