import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInfosCardComponent } from './appointment-infos-card.component';

describe('AppointmentInfosCardComponent', () => {
  let component: AppointmentInfosCardComponent;
  let fixture: ComponentFixture<AppointmentInfosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentInfosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInfosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
