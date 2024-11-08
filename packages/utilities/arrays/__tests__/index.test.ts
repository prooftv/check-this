import { describe, it, expect } from 'vitest';
import { isUnique, isNotUnique } from '../index';

describe('Array utilities', () => {
  describe('isUnique', () => {
    it('should return true for unique elements', () => {
      const array = [1, 2, 3, 4, 5];
      expect(array.every(isUnique)).toBe(true);
    });

    it('should return false for arrays with duplicates', () => {
      const array = [1, 2, 2, 3, 4];
      expect(array.every(isUnique)).toBe(false);
    });

    it('should work with strings', () => {
      const uniqueStrings = ['a', 'b', 'c'];
      const duplicateStrings = ['a', 'b', 'b', 'c'];

      expect(uniqueStrings.every(isUnique)).toBe(true);
      expect(duplicateStrings.every(isUnique)).toBe(false);
    });

    it('should work with objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const uniqueObjects = [obj1, obj2];
      const duplicateObjects = [obj1, obj2, obj1];

      expect(uniqueObjects.every(isUnique)).toBe(true);
      expect(duplicateObjects.every(isUnique)).toBe(false);
    });
  });

  describe('isNotUnique', () => {
    it('should return false for unique elements', () => {
      const array = [1, 2, 3, 4, 5];
      expect(array.some(isNotUnique)).toBe(false);
    });

    it('should return true for arrays with duplicates', () => {
      const array = [1, 2, 2, 3, 4];
      expect(array.some(isNotUnique)).toBe(true);
    });

    it('should work with strings', () => {
      const uniqueStrings = ['a', 'b', 'c'];
      const duplicateStrings = ['a', 'b', 'b', 'c'];

      expect(uniqueStrings.some(isNotUnique)).toBe(false);
      expect(duplicateStrings.some(isNotUnique)).toBe(true);
    });

    it('should work with objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const uniqueObjects = [obj1, obj2];
      const duplicateObjects = [obj1, obj2, obj1];

      expect(uniqueObjects.some(isNotUnique)).toBe(false);
      expect(duplicateObjects.some(isNotUnique)).toBe(true);
    });
  });
});
