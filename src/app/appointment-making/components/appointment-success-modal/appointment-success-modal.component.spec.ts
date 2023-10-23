import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSuccessModalComponent } from './appointment-success-modal.component';

describe('AppointmentSuccessModalComponent', () => {
  let component: AppointmentSuccessModalComponent;
  let fixture: ComponentFixture<AppointmentSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSuccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
