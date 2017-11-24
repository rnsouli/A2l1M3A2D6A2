import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleHomeComponent } from './middle-home.component';

describe('MiddleHomeComponent', () => {
  let component: MiddleHomeComponent;
  let fixture: ComponentFixture<MiddleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
