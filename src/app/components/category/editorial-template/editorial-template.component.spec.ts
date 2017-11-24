import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialTemplateComponent } from './editorial-template.component';

describe('EditorialTemplateComponent', () => {
  let component: EditorialTemplateComponent;
  let fixture: ComponentFixture<EditorialTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorialTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
