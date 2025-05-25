import { TestBed } from '@angular/core/testing';

import { BuscadorCancionesService } from './buscador-canciones.service';

describe('BuscadorCancionesService', () => {
  let service: BuscadorCancionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorCancionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
