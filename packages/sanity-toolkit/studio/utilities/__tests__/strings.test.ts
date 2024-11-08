import { describe, it, expect } from 'vitest';
import { generateItemKey, tokenize } from '../strings';

describe('generateItemKey', () => {
  it('should generate a key of length 12', () => {
    const key = generateItemKey();
    expect(key).toHaveLength(12);
  });

  it('should generate a key with only lowercase letters and numbers', () => {
    const key = generateItemKey();
    expect(key).toMatch(/^[a-z0-9]{12}$/);
  });

  it('should generate unique keys', () => {
    const key1 = generateItemKey();
    const key2 = generateItemKey();
    expect(key1).not.toBe(key2);
  });

  it('should generate a key that does not contain uppercase letters', () => {
    const key = generateItemKey();
    expect(key).not.toMatch(/[A-Z]/);
  });

  it('should generate a key that does not contain special characters', () => {
    const key = generateItemKey();
    expect(key).not.toMatch(/[^a-z0-9]/);
  });
});

describe('tokenize', () => {
  it('should tokenize a simple string', () => {
    const result = tokenize('hello world');
    expect(result).toEqual(['hello', 'world']);
  });

  it('should handle strings with special characters', () => {
    const result = tokenize('hello-world.test');
    expect(result).toEqual(['hello', 'world', 'test']);
  });

  it('should normalize and remove diacritics', () => {
    const result = tokenize('héllo wörld');
    expect(result).toEqual(['hello', 'world']);
  });

  it('should handle strings with numbers', () => {
    const result = tokenize('hello 123 world');
    expect(result).toEqual(['hello', '123', 'world']);
  });

  it('should return an empty array for an empty string', () => {
    const result = tokenize('');
    expect(result).toEqual([]);
  });

  it('should trim and replace multiple spaces with a single dash', () => {
    const result = tokenize('  hello   world  ');
    expect(result).toEqual(['hello', 'world']);
  });
});
