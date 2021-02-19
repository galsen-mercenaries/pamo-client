import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-registration-success-dialog",
  templateUrl: "./registration-success-dialog.component.html",
  styleUrls: ["./registration-success-dialog.component.scss"],
})
export class RegistrationSuccessDialogComponent implements OnInit {
  nom: string;
  signingIn: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.nom = this.data.prenom + " " + this.data.nom;
  }

  login() {
    this.signingIn = true;
    alert("logged in");
  }
}
