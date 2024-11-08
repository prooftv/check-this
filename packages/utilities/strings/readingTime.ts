/**
 * Returns a number in minutes for estimated reading time.
 * By default, we assume an average word length of 5 characters, and an average
 * words per minute of 180. These are configurable via the options.
 */
export function readingTime(
  contentLength: number,
  options?: {
    averageWordLength?: number;
    averageWordsPerMinute?: number;
  },
) {
  const averageWordLength = options?.averageWordLength ?? 5;
  const averageWordsPerMinute = options?.averageWordsPerMinute ?? 180;

  const readTime = Math.round(contentLength / averageWordLength / averageWordsPerMinute);

  const estimatedReadingTime = readTime === 0 ? 'Less than 1' : `${readTime}`;

  return {
    estimatedReadingTime,
    readingTimeText: estimatedReadingTime ? `${estimatedReadingTime} minute read` : null,
  };
}
