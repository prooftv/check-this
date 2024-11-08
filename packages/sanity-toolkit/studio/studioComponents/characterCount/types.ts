export interface CharCountOptions {
  showCount?: boolean; // false to explicitly hide, true to explicitly show, undefined to base it on if minLength or maxLength is defined
  minLength?: number;
  maxLength?: number;
}
