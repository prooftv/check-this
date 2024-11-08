import { describe, expect, it } from 'vitest';
import { capitalize, capitalizeEachWord } from '../capitalize';

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
});

describe('capitalizeEachWord', () => {
  it('capitalizes each word in a string', () => {
    expect(capitalizeEachWord('hello world')).toBe('Hello World');
    expect(capitalizeEachWord('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  it('handles strings with multiple spaces', () => {
    expect(capitalizeEachWord('hello   world')).toBe('Hello   World');
  });

  it('converts all-caps to proper case', () => {
    expect(capitalizeEachWord('HELLO WORLD')).toBe('Hello World');
  });
});
