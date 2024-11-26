import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociationStepComponent } from './negociation-step.component';

describe('NegociationStepComponent', () => {
  let component: NegociationStepComponent;
  let fixture: ComponentFixture<NegociationStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegociationStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
