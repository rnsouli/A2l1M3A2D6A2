import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentSpecificResolver } from './EnvironmentSpecificResolver';

describe('EnvironmentSpecificResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentSpecificResolver]
    });
  });

  it('should be created', inject([EnvironmentSpecificResolver], (service: EnvironmentSpecificResolver) => {
    expect(service).toBeTruthy();
  }));
});
