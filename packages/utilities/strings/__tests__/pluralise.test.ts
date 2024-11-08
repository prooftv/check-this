import { describe, expect, it } from 'vitest';
import { pluralise } from '../pluralise';

describe('pluralise', () => {
  it('returns singular form for count of 1', () => {
    expect(pluralise('cat', 1)).toBe('cat');
  });

  it('adds "s" for regular words', () => {
    expect(pluralise('cat', 2)).toBe('cats');
  });

  it('handles words ending in "y"', () => {
    expect(pluralise('puppy', 2)).toBe('puppies');
    expect(pluralise('day', 2)).toBe('days'); // words ending in vowel + y
  });

  it('handles words ending in s, sh, ch, x, z', () => {
    expect(pluralise('bus', 2)).toBe('buses');
    expect(pluralise('dish', 2)).toBe('dishes');
    expect(pluralise('watch', 2)).toBe('watches');
    expect(pluralise('box', 2)).toBe('boxes');
    expect(pluralise('buzz', 2)).toBe('buzzes');
  });

  it('uses custom plural when provided', () => {
    expect(pluralise('person', 2, 'people')).toBe('people');
  });

  it('uses custom zero form when count is 0', () => {
    expect(pluralise('cat', 0, undefined, 'no cats')).toBe('no cats');
  });
});
