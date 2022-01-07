import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-set-appointment-new-date-modal",
  templateUrl: "./set-appointment-new-date-modal.component.html",
  styleUrls: ["./set-appointment-new-date-modal.component.scss"],
})
export class SetAppointmentNewDateModalComponent implements OnInit {
  todayDate = new Date();
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SetAppointmentNewDateModalComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [
        new Date(this.data?.appointment?.datePatient),
        Validators.required,
      ],
      reason: [null],
    });
  }
}
