import { TestBed } from '@angular/core/testing';

import { MasterBasicService } from './master-basic.service';

describe('MasterBasicService', () => {
  let service: MasterBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
