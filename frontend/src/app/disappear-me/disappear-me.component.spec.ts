import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisappearMeComponent } from './disappear-me.component';

describe('DisappearMeComponent', () => {
  let component: DisappearMeComponent;
  let fixture: ComponentFixture<DisappearMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisappearMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisappearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
