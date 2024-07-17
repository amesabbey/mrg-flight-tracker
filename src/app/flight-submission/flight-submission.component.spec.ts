import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSubmissionComponent } from './flight-submission.component';

describe('FlightSubmissionComponent', () => {
  let component: FlightSubmissionComponent;
  let fixture: ComponentFixture<FlightSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
