import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-actions-medecins-page',
  templateUrl: './user-actions-medecins-page.component.html',
  styleUrls: ['./user-actions-medecins-page.component.scss']
})
export class UserActionsMedecinsPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    history.back();
  }

}
