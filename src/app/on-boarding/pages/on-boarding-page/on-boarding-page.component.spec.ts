import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingPageComponent } from './on-boarding-page.component';

describe('OnBoardingPageComponent', () => {
  let component: OnBoardingPageComponent;
  let fixture: ComponentFixture<OnBoardingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
