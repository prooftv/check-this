import { describe, it, expect } from 'vitest';
import { isDeveloperOrAdmin, isDeveloper, isAdmin, isValidRole } from '../';
import { ROLE } from '../../../constants/roles';

describe('roles utilities', () => {
  const mockUser = {
    name: 'user',
    id: '1',
    email: 'test@user.com',
    roles: [
      { title: 'admin', name: ROLE.ADMINISTRATOR },
      { title: 'developer', name: ROLE.DEVELOPER },
    ],
  };

  const mockUserWithoutRoles = {
    ...mockUser,
    roles: [],
  };

  describe('isDeveloperOrAdmin', () => {
    it('should return true if user is an admin or developer', () => {
      expect(isDeveloperOrAdmin(mockUser)).toBe(true);
    });

    it('should return false if user is neither an admin nor a developer', () => {
      expect(isDeveloperOrAdmin(mockUserWithoutRoles)).toBe(false);
    });

    it('should return false if user is null', () => {
      expect(isDeveloperOrAdmin(null)).toBe(false);
    });
  });

  describe('isDeveloper', () => {
    it('should return true if user is a developer', () => {
      expect(isDeveloper(mockUser)).toBe(true);
    });

    it('should return false if user is not a developer', () => {
      expect(isDeveloper(mockUserWithoutRoles)).toBe(false);
    });

    it('should return false if user is null', () => {
      expect(isDeveloper(null)).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should return true if user is an admin', () => {
      expect(isAdmin(mockUser)).toBe(true);
    });

    it('should return false if user is not an admin', () => {
      expect(isAdmin(mockUserWithoutRoles)).toBe(false);
    });

    it('should return false if user is null', () => {
      expect(isAdmin(null)).toBe(false);
    });
  });

  describe('isValidRole', () => {
    it('should return true if user has a valid role', () => {
      expect(isValidRole([ROLE.ADMINISTRATOR], mockUser)).toBe(true);
    });

    it('should return false if user does not have a valid role', () => {
      expect(isValidRole([ROLE.ADMINISTRATOR], mockUserWithoutRoles)).toBe(false);
    });

    it('should return undefined if user is null', () => {
      expect(isValidRole([ROLE.ADMINISTRATOR], null)).toBe(undefined);
    });
  });
});
