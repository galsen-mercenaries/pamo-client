import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentConfirmationModalComponent } from './appointment-confirmation-modal.component';

describe('AppointmentConfirmationModalComponent', () => {
  let component: AppointmentConfirmationModalComponent;
  let fixture: ComponentFixture<AppointmentConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
