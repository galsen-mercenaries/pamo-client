import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLinkedUserComponent } from './delete-linked-user.component';

describe('DeleteLinkedUserComponent', () => {
  let component: DeleteLinkedUserComponent;
  let fixture: ComponentFixture<DeleteLinkedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLinkedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLinkedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
