import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { SearchMedecinDialogComponent } from "../../components/search-medecin-dialog/search-medecin-dialog.component";

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
  medecin;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.setAppointmentForm();
  }

  setAppointmentForm() {
    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      symptom: ["", Validators.required],
    });
  }

  openModalSelectMedecin() {
    const dialogRef = this.dialog.open(SearchMedecinDialogComponent, {
      panelClass: "search-doctor-modal",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.medecin) {
        this.medecin = result.medecin;
      }
    });
  }
}
