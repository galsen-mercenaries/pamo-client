import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentValidationComponent } from './appointment-validation.component';

describe('AppointmentValidationComponent', () => {
  let component: AppointmentValidationComponent;
  let fixture: ComponentFixture<AppointmentValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
