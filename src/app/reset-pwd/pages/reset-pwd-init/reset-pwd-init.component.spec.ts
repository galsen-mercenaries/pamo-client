import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdInitComponent } from './reset-pwd-init.component';

describe('ResetPwdInitComponent', () => {
  let component: ResetPwdInitComponent;
  let fixture: ComponentFixture<ResetPwdInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwdInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPwdInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
