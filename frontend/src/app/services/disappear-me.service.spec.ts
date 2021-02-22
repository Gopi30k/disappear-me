import { TestBed } from '@angular/core/testing';

import { DisappearMeService } from './disappear-me.service';

describe('DisappearMeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisappearMeService = TestBed.get(DisappearMeService);
    expect(service).toBeTruthy();
  });
});
