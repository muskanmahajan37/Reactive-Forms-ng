import { TestBed } from '@angular/core/testing';

import { RegistractionService } from './registraction.service';

describe('RegistractionService', () => {
  let service: RegistractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
