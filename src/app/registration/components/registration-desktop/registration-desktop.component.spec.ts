import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDesktopComponent } from './registration-desktop.component';

describe('RegistrationDesktopComponent', () => {
  let component: RegistrationDesktopComponent;
  let fixture: ComponentFixture<RegistrationDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
