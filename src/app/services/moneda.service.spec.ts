import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './moneda.service';

describe('MonedaService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
