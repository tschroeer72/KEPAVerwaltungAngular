import { TestBed } from '@angular/core/testing';

import { MeisterschaftService } from './meisterschaft.service';

describe('MeisterschaftService', () => {
  let service: MeisterschaftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeisterschaftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
