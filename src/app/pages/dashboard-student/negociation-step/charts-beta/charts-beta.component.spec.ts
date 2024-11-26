import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBetaComponent } from './charts-beta.component';

describe('ChartsBetaComponent', () => {
  let component: ChartsBetaComponent;
  let fixture: ComponentFixture<ChartsBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
