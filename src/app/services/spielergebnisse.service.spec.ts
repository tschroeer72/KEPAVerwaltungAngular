import { TestBed } from '@angular/core/testing';

import { SpielergebnisseService } from './spielergebnisse.service';

describe('SpielergebnisseService', () => {
  let service: SpielergebnisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpielergebnisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
