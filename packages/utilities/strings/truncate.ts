interface TruncateOptions {
  ellipsis?: string;
  trimWord?: boolean;
}

export function truncate(string: string, maxLength: number, options: TruncateOptions = {}) {
  const { ellipsis = '...', trimWord = false } = options;

  if (string.length <= maxLength) {
    return string;
  }

  if (trimWord) {
    return string.slice(0, maxLength) + ellipsis;
  }

  // Check if the string contains any whitespace
  const hasWhitespace = /\s/.test(string);

  // If it's a single word, return it without truncating
  if (!hasWhitespace) {
    return string;
  }

  // To prevent truncating in the middle of words,
  // we get the position of the first whitespace after the truncation
  const firstWhitespaceAfterTruncation = string.slice(maxLength).search(/\s/) + maxLength;

  return string.slice(0, firstWhitespaceAfterTruncation) + ellipsis;
}
