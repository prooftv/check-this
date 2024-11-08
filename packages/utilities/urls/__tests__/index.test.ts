import { describe, expect, it } from 'vitest';
import {
  stripMarginSlashes,
  removeDoubleSlashes,
  slugify,
  isExternalUrl,
  formatPath,
} from '../index';

describe('stripMarginSlashes', () => {
  it('removes leading and trailing slashes', () => {
    expect(stripMarginSlashes('/hello/world/')).toBe('hello/world');
  });

  it('handles strings without slashes', () => {
    expect(stripMarginSlashes('hello')).toBe('hello');
  });
});

describe('removeDoubleSlashes', () => {
  it('removes double slashes', () => {
    expect(removeDoubleSlashes('/hello//world/')).toBe('/hello/world/');
  });

  it('handles multiple consecutive slashes', () => {
    expect(removeDoubleSlashes('/hello///world/')).toBe('/hello/world/');
  });
});

describe('slugify', () => {
  it('converts strings to URL-friendly format', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('This & That')).toBe('this-and-that');
  });

  it('handles special characters', () => {
    expect(slugify('Hello & Goodbye!')).toBe('hello-and-goodbye');
  });
});

describe('isExternalUrl', () => {
  it('identifies external URLs', () => {
    expect(isExternalUrl('https://example.com')).toBe(true);
    expect(isExternalUrl('http://example.com')).toBe(true);
    expect(isExternalUrl('example.com')).toBe(true);
  });

  it('handles invalid URLs', () => {
    expect(isExternalUrl('/local/path')).toBe(false);
    expect(isExternalUrl('not-a-url')).toBe(false);
  });
});

describe('formatPath', () => {
  it('formats paths correctly', () => {
    expect(formatPath('hello/world')).toBe('/hello/world');
    expect(formatPath('/hello/world/')).toBe('/hello/world');
  });

  it('handles empty paths', () => {
    expect(formatPath('')).toBe('/');
  });
});
