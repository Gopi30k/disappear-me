import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewPageComponent } from './content-view-page.component';

describe('ContentViewPageComponent', () => {
  let component: ContentViewPageComponent;
  let fixture: ComponentFixture<ContentViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
