import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMobileComponent } from './registration-mobile.component';

describe('RegistrationMobileComponent', () => {
  let component: RegistrationMobileComponent;
  let fixture: ComponentFixture<RegistrationMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
