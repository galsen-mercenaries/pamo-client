import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMakingComponent } from './appointment-making.component';

describe('AppointmentMakingComponent', () => {
  let component: AppointmentMakingComponent;
  let fixture: ComponentFixture<AppointmentMakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentMakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
