import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFicheMedicalComponent } from './edit-fiche-medical.component';

describe('EditFicheMedicalComponent', () => {
  let component: EditFicheMedicalComponent;
  let fixture: ComponentFixture<EditFicheMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFicheMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFicheMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
