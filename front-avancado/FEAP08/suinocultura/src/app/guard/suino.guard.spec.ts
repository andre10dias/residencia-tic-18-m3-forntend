import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { suinoGuard } from './suino.guard';

describe('suinoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => suinoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
