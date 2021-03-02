import { TestBed, async, inject } from '@angular/core/testing';

import { DisappearmeAuthGuard } from './disappearme-auth.guard';

describe('DisappearmeAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisappearmeAuthGuard]
    });
  });

  it('should ...', inject([DisappearmeAuthGuard], (guard: DisappearmeAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
