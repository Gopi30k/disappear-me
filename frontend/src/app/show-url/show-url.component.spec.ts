import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowURLComponent } from './show-url.component';

describe('ShowURLComponent', () => {
  let component: ShowURLComponent;
  let fixture: ComponentFixture<ShowURLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowURLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
