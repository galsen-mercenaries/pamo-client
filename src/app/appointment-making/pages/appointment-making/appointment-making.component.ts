import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-appointment-making",
  templateUrl: "./appointment-making.component.html",
  styleUrls: ["./appointment-making.component.scss"],
})
export class AppointmentMakingComponent implements OnInit {
  specialities = [
    { name: "Ophtalmologue" },
    { name: "Dentiste" },
    { name: "Neurologue" },
    { name: "Gynécologue" },
  ];
  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setAppointmentForm();
  }

  setAppointmentForm() {
    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      medecin: [null, Validators.required],
      symptom: ["", Validators.required],
      newDoctor: [Validators.required],
    });
  }
}
