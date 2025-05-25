import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorImgComponent } from './generador-img.component';

describe('GeneradorImgComponent', () => {
  let component: GeneradorImgComponent;
  let fixture: ComponentFixture<GeneradorImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneradorImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
