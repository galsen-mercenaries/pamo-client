import { TestBed } from '@angular/core/testing';

import { StructuresSanitairesService } from './structures-sanitaires.service';

describe('StructuresSanitairesService', () => {
  let service: StructuresSanitairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructuresSanitairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
