import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTemplateComponent } from './listing-template.component';

describe('ListingTemplateComponent', () => {
  let component: ListingTemplateComponent;
  let fixture: ComponentFixture<ListingTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
