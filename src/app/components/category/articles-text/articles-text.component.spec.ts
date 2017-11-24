import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTextComponent } from './articles-text.component';

describe('ArticlesTextComponent', () => {
  let component: ArticlesTextComponent;
  let fixture: ComponentFixture<ArticlesTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
