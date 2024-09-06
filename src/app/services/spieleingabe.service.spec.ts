import { TestBed } from '@angular/core/testing';

import { SpieleingabeService } from './spieleingabe.service';

describe('SpieleingabeService', () => {
  let service: SpieleingabeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpieleingabeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
