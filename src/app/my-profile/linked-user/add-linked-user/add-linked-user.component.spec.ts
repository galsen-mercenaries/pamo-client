import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkedUserComponent } from './add-linked-user.component';

describe('AddLinkedUserComponent', () => {
  let component: AddLinkedUserComponent;
  let fixture: ComponentFixture<AddLinkedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLinkedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
