import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePollComponent } from './active-poll.component';

describe('ActivePollComponent', () => {
  let component: ActivePollComponent;
  let fixture: ComponentFixture<ActivePollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
