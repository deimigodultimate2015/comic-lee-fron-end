import { TestBed } from '@angular/core/testing';

import { SearchEmitterService } from './search-emitter.service';

describe('SearchEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchEmitterService = TestBed.get(SearchEmitterService);
    expect(service).toBeTruthy();
  });
});
