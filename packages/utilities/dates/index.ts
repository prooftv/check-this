export function articleDate(published: Date, updated?: Date) {
  const publishedDate = humanReadable(published);
  if (!updated || updated.getTime() === published.getTime()) {
    return publishedDate;
  }
  return `${publishedDate} — Updated at ${humanReadable(updated)}`;
}

export function humanReadable(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const finalOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

  return dateObject.toLocaleDateString('en-GB', finalOptions);
}
