import { Reflector } from '@nestjs/core';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    const mockReflector: Partial<Reflector> = {
      get: jest.fn(),
    };
    const guard = new RoleGuard(mockReflector as Reflector);
    expect(guard).toBeDefined();
  });
});
