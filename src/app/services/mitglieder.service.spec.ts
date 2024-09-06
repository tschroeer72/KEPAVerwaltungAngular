import { TestBed } from '@angular/core/testing';

import { MitgliederService } from './mitglieder.service';

describe('MitgliederService', () => {
  let service: MitgliederService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitgliederService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
