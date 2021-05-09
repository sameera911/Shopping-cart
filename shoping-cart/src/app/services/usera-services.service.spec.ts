import { TestBed } from '@angular/core/testing';

import { UseraServicesService } from './usera-services.service';

describe('UseraServicesService', () => {
  let service: UseraServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseraServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
