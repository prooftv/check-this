import { describe, expect, it } from 'vitest';
import { legibleTextColor } from '../index';

describe('legibleTextColor', () => {
  it('returns white for dark colors', () => {
    expect(legibleTextColor('#000000')).toBe('white');
    expect(legibleTextColor('#333333')).toBe('white');
    expect(legibleTextColor('rgb(0, 0, 0)')).toBe('white');
  });

  it('returns black for light colors', () => {
    expect(legibleTextColor('#ffffff')).toBe('black');
    expect(legibleTextColor('#f5f5f5')).toBe('black');
    expect(legibleTextColor('rgb(255, 255, 255)')).toBe('black');
  });

  it('handles RGB format', () => {
    expect(legibleTextColor('rgb(0, 0, 0)')).toBe('white');
    expect(legibleTextColor('rgb(255, 255, 255)')).toBe('black');
  });

  it('handles RGBA format', () => {
    expect(legibleTextColor('rgba(0, 0, 0, 1)')).toBe('white');
    expect(legibleTextColor('rgba(255, 255, 255, 1)')).toBe('black');
  });

  it('throws error for invalid input', () => {
    expect(() => legibleTextColor('invalid')).toThrow();
    expect(() => legibleTextColor('')).toThrow();
    expect(() => legibleTextColor('not-a-color')).toThrow();
  });
});
