import { TestBed } from '@angular/core/testing';

import { SvoitureService } from './svoiture.service';

describe('SvoitureService', () => {
  let service: SvoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
