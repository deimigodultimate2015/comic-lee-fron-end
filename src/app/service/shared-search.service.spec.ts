import { TestBed } from '@angular/core/testing';

import { SharedSearchService } from './shared-search.service';

describe('SharedSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedSearchService = TestBed.get(SharedSearchService);
    expect(service).toBeTruthy();
  });
});
