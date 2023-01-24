import { TestBed } from '@angular/core/testing';

import { SgarageService } from './sgarage.service';

describe('SgarageService', () => {
  let service: SgarageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgarageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
