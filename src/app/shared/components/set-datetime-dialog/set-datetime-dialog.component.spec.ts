import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatetimeDialogComponent } from './set-datetime-dialog.component';

describe('SetDatetimeDialogComponent', () => {
  let component: SetDatetimeDialogComponent;
  let fixture: ComponentFixture<SetDatetimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetDatetimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDatetimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
