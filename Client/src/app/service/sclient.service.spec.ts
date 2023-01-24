import { TestBed } from '@angular/core/testing';

import { SclientService } from './sclient.service';

describe('SclientService', () => {
  let service: SclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
