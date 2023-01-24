import { TestBed } from '@angular/core/testing';

import { SfincancierService } from './sfincancier.service';

describe('SfincancierService', () => {
  let service: SfincancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfincancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
