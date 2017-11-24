import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HassubcategoriesTemplateComponent } from './hassubcategories-template.component';

describe('HassubcategoriesTemplateComponent', () => {
  let component: HassubcategoriesTemplateComponent;
  let fixture: ComponentFixture<HassubcategoriesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HassubcategoriesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HassubcategoriesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
