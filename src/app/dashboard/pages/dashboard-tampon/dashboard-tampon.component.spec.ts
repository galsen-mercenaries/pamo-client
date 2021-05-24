import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTamponComponent } from './dashboard-tampon.component';

describe('DashboardTamponComponent', () => {
  let component: DashboardTamponComponent;
  let fixture: ComponentFixture<DashboardTamponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTamponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTamponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
