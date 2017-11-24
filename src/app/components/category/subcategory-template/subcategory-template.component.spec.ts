import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryTemplateComponent } from './subcategory-template.component';

describe('SubcategoryTemplateComponent', () => {
  let component: SubcategoryTemplateComponent;
  let fixture: ComponentFixture<SubcategoryTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
