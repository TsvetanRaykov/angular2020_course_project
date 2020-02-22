import { TestBed } from '@angular/core/testing';

import { KinveyPizzaService } from './kinvey-pizza.service';

describe('KinveyPizzaService', () => {
  let service: KinveyPizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinveyPizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
