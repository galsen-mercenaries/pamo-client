import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdFinishComponent } from './reset-pwd-finish.component';

describe('ResetPwdFinishComponent', () => {
  let component: ResetPwdFinishComponent;
  let fixture: ComponentFixture<ResetPwdFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwdFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPwdFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
