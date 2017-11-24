import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteMiddleHomeComponent } from './white-middle-home.component';

describe('WhiteMiddleHomeComponent', () => {
  let component: WhiteMiddleHomeComponent;
  let fixture: ComponentFixture<WhiteMiddleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteMiddleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteMiddleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
