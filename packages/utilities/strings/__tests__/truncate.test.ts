import { describe, expect, it } from 'vitest';
import { truncate } from '../truncate';

describe('truncate', () => {
  it('returns original string if shorter than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('truncates string at word boundary', () => {
    expect(truncate('Hello world and universe', 11)).toBe('Hello world...');
  });

  it('uses custom ellipsis', () => {
    expect(truncate('Hello world and universe', 11, { ellipsis: '---' })).toBe(
      'Hello world---',
    );
  });

  it('handles strings without spaces', () => {
    expect(truncate('Areallylongword and such', 5)).toBe('Areallylongword...');
  });

  it('does not truncate single words without spaces', () => {
    expect(truncate('Asingleword', 5)).toBe('Asingleword');
  });

  it('truncates at exact length when trimWord is true', () => {
    expect(truncate('Hello world and universe', 7, { trimWord: true })).toBe('Hello w...');
  });

  it('truncates long words when trimWord is true', () => {
    expect(truncate('Supercalifragilisticexpialidocious', 10, { trimWord: true })).toBe(
      'Supercalif...',
    );
  });

  it('respects both trimWord and custom ellipsis', () => {
    expect(truncate('Hello world and universe', 7, { trimWord: true, ellipsis: '---' })).toBe(
      'Hello w---',
    );
  });

  it('explicitly setting trimWord to false maintains word boundary behavior', () => {
    expect(truncate('Hello world and universe', 7, { trimWord: false })).toBe(
      'Hello world...',
    );
  });
});
