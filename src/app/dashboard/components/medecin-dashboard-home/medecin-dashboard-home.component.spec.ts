import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinDashboardHomeComponent } from './medecin-dashboard-home.component';

describe('MedecinDashboardHomeComponent', () => {
  let component: MedecinDashboardHomeComponent;
  let fixture: ComponentFixture<MedecinDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinDashboardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
