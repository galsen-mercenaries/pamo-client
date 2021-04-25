import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedecinDialogComponent } from './search-medecin-dialog.component';

describe('SearchMedecinDialogComponent', () => {
  let component: SearchMedecinDialogComponent;
  let fixture: ComponentFixture<SearchMedecinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMedecinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMedecinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
