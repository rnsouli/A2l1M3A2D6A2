import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPartialComponent } from './video-partial.component';

describe('VideoPartialComponent', () => {
  let component: VideoPartialComponent;
  let fixture: ComponentFixture<VideoPartialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPartialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
