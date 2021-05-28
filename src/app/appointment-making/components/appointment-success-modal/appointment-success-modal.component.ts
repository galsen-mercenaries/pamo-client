import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-appointment-success-modal",
  templateUrl: "./appointment-success-modal.component.html",
  styleUrls: ["./appointment-success-modal.component.scss"],
})
export class AppointmentSuccessModalComponent implements OnInit {
  constructor(
    public router: Router,
    public dialog: MatDialogRef<AppointmentSuccessModalComponent>
  ) {}

  ngOnInit(): void {}

  goHome() {
    this.dialog.close();
    this.router.navigate(["/dashboard"]);
  }
}
