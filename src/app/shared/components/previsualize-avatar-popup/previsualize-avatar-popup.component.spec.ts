import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizeAvatarPopupComponent } from './previsualize-avatar-popup.component';

describe('PrevisualizeAvatarPopupComponent', () => {
  let component: PrevisualizeAvatarPopupComponent;
  let fixture: ComponentFixture<PrevisualizeAvatarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisualizeAvatarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizeAvatarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
