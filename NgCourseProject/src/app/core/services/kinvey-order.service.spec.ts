import { TestBed } from '@angular/core/testing';

import { KinveyOrderService } from './kinvey-order.service';

describe('KinveyOrderService', () => {
  let service: KinveyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinveyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
