import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsMedecinsPageComponent } from './user-actions-medecins-page.component';

describe('UserActionsMedecinsPageComponent', () => {
  let component: UserActionsMedecinsPageComponent;
  let fixture: ComponentFixture<UserActionsMedecinsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionsMedecinsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionsMedecinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
