import { TestBed } from '@angular/core/testing';

import { AutocompleteAddresesService } from './autocomplete-addreses.service';

describe('AutocmpleteAddresesService', () => {
  let service: AutocompleteAddresesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteAddresesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
