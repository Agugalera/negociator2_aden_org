import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedStepComponent } from './finished-step.component';

describe('FinishedStepComponent', () => {
  let component: FinishedStepComponent;
  let fixture: ComponentFixture<FinishedStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinishedStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
