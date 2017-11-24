import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowMiddleHomeComponent } from './yellow-middle-home.component';

describe('YellowMiddleHomeComponent', () => {
  let component: YellowMiddleHomeComponent;
  let fixture: ComponentFixture<YellowMiddleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YellowMiddleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowMiddleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
