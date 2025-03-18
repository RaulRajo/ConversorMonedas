import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorMonedasComponent } from './conversor-monedas.component';

describe('ConversorMonedasComponent', () => {
  let component: ConversorMonedasComponent;
  let fixture: ComponentFixture<ConversorMonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversorMonedasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversorMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
