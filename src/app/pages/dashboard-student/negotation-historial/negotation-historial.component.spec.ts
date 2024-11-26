import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotationHistorialComponent } from './negotation-historial.component';

describe('NegotationHistorialComponent', () => {
  let component: NegotationHistorialComponent;
  let fixture: ComponentFixture<NegotationHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NegotationHistorialComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegotationHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
