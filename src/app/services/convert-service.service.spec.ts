import { TestBed, inject } from '@angular/core/testing';

import { ConvertServiceService } from './convert-service.service';

describe('ConvertServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvertServiceService]
    });
  });

  it('should be created', inject([ConvertServiceService], (service: ConvertServiceService) => {
    expect(service).toBeTruthy();
  }));
});
