import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { eventoGuard } from './evento.guard';

describe('eventoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => eventoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
