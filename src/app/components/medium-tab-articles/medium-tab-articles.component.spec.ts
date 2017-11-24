import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumTabArticlesComponent } from './medium-tab-articles.component';

describe('MediumTabArticlesComponent', () => {
  let component: MediumTabArticlesComponent;
  let fixture: ComponentFixture<MediumTabArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumTabArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumTabArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
