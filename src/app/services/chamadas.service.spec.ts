import { TestBed } from '@angular/core/testing';

import { ChamadasService } from './chamadas.service';

describe('ChamadasService', () => {
  let service: ChamadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
