import './CharacterCount.css';
import type { CharCountOptions } from './types';

/**
 * Adds a Character Counter to an input component.
 * If `showCount` is true, or a `minLength` or `maxLength` is passed, the counter will display.
 * Setting `showCount` to false will always hide it.
 * If a `maxLength` is passed, the counter will show both the current count and the max count.
 * The UI will show a warning state if the charCount is below `minLength` or above `maxLength`.
 */
export default function CharacterCount({
  charCount = 0,
  options,
}: Readonly<{
  charCount?: number;
  options?: null | CharCountOptions;
}>) {
  if (!options || options.showCount === false) {
    return;
  }

  const { minLength, maxLength, showCount } = options;

  let output: string | undefined = undefined;

  if (showCount ?? minLength ?? maxLength) {
    output = `${charCount}`;
    if (maxLength) {
      output = `${output} / ${maxLength}`;
    }
  }

  const classes = [];
  if (minLength ?? maxLength) {
    classes.push('char-count-text-input');
  }
  if (!!(minLength && charCount < minLength) || !!(maxLength && charCount > maxLength)) {
    classes.push('char-count-text-input--warning');
  }

  return <span className={classes.join(' ')}>{output ?? ''}</span>;
}
