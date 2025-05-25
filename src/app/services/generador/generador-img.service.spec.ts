import { TestBed } from '@angular/core/testing';

import { GeneradorImgService } from './generador-img.service';

describe('GeneradorImgService', () => {
  let service: GeneradorImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
