import { TestBed } from '@angular/core/testing';

import { FicheMedicalService } from './fiche-medical.service';

describe('FicheMedicalService', () => {
  let service: FicheMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
