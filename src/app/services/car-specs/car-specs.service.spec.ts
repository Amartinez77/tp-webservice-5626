import { TestBed } from '@angular/core/testing';

import { CarSpecsService } from './car-specs.service';

describe('CardMakerService', () => {
  let service: CarSpecsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarSpecsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
