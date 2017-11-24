import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomHomeComponent } from './bottom-home.component';

describe('BottomHomeComponent', () => {
  let component: BottomHomeComponent;
  let fixture: ComponentFixture<BottomHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
