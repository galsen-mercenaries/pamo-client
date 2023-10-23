import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinsCalendarComponent } from './medecins-calendar.component';

describe('MedecinsCalendarComponent', () => {
  let component: MedecinsCalendarComponent;
  let fixture: ComponentFixture<MedecinsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinsCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
