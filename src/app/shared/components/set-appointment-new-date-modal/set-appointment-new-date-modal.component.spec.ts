import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAppointmentNewDateModalComponent } from './set-appointment-new-date-modal.component';

describe('SetAppointmentNewDateModalComponent', () => {
  let component: SetAppointmentNewDateModalComponent;
  let fixture: ComponentFixture<SetAppointmentNewDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAppointmentNewDateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAppointmentNewDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
