import { describe, expect, it } from 'vitest';
import { articleDate, humanReadable } from '../index';

describe('humanReadable', () => {
  it('formats date in British format', () => {
    const date = new Date('2024-01-15');
    expect(humanReadable(date)).toBe('15 January 2024');
  });

  it('accepts string dates', () => {
    expect(humanReadable('2024-01-15')).toBe('15 January 2024');
  });

  it('handles custom options', () => {
    const date = new Date('2024-01-15');
    expect(humanReadable(date, { month: 'short', year: '2-digit' })).toBe('15 Jan 24');
  });
});

describe('articleDate', () => {
  it('returns published date when no update date', () => {
    const published = new Date('2024-01-15');
    expect(articleDate(published)).toBe('15 January 2024');
  });

  it('includes update date when different from published', () => {
    const published = new Date('2024-01-15');
    const updated = new Date('2024-01-20');
    expect(articleDate(published, updated)).toBe(
      '15 January 2024 — Updated at 20 January 2024',
    );
  });

  it('shows only published date when update date is same', () => {
    const published = new Date('2024-01-15');
    const updated = new Date('2024-01-15');
    expect(articleDate(published, updated)).toBe('15 January 2024');
  });
});
