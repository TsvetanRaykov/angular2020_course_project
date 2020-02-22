import { TestBed } from '@angular/core/testing';

import { KinveyUserAuthService } from './kinvey-user-auth.service';

describe('KinveyUserAuthService', () => {
  let service: KinveyUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinveyUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
