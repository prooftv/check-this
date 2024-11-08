import { describe, expect, it } from 'vitest';
import { readingTime } from '../readingTime';

describe('readingTime', () => {
  it('calculates reading time with default options', () => {
    const shortText = readingTime(100); // 20 words
    expect(shortText.estimatedReadingTime).toBe('Less than 1');
    expect(shortText.readingTimeText).toBe('Less than 1 minute read');

    const mediumText = readingTime(900); // 180 words
    expect(mediumText.estimatedReadingTime).toBe('1');
    expect(mediumText.readingTimeText).toBe('1 minute read');

    const longText = readingTime(1800); // 360 words
    expect(longText.estimatedReadingTime).toBe('2');
    expect(longText.readingTimeText).toBe('2 minute read');
  });

  it('respects custom average word length', () => {
    const result = readingTime(1000, { averageWordLength: 4 });
    expect(result.estimatedReadingTime).toBe('1');
  });

  it('respects custom words per minute', () => {
    const result = readingTime(900, { averageWordsPerMinute: 90 });
    expect(result.estimatedReadingTime).toBe('2');
  });
});
