import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserResolver = TestBed.get(UserResolver);
    expect(service).toBeTruthy();
  });
});
