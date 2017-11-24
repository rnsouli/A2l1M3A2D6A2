import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTabArticlesComponent } from './large-tab-articles.component';

describe('LargeTabArticlesComponent', () => {
  let component: LargeTabArticlesComponent;
  let fixture: ComponentFixture<LargeTabArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeTabArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTabArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
