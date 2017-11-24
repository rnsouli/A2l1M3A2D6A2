import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricatureTemplateComponent } from './caricature-template.component';

describe('CaricatureTemplateComponent', () => {
  let component: CaricatureTemplateComponent;
  let fixture: ComponentFixture<CaricatureTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaricatureTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaricatureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
