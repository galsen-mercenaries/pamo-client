import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresByPrestatairesComponent } from './structures-by-prestataires.component';

describe('StructuresByPrestatairesComponent', () => {
  let component: StructuresByPrestatairesComponent;
  let fixture: ComponentFixture<StructuresByPrestatairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuresByPrestatairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresByPrestatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
