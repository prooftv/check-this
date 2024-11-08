/**
 * Validates that string is a valid slug/pathname/clean URL. Lowercase letters [a-z], numbers [0-9], and dashes ("-").
 */
export const stringIsSlug = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Validates that string starts with # or ? and is a valid anchor or query parameter (or both), e.g. "#anchor?campaign=track&value=score".
 */
export const urlAnchorOrParameters =
  /^(#([a-zA-Z0-9_-]+)?(\?([a-zA-Z0-9_-]+(=[a-zA-Z0-9_-]+)?)(?:&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?|(\?([a-zA-Z0-9_-]+(=[a-zA-Z0-9_-]+)?)(?:&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*))$/;
