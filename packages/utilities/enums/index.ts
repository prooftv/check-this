/**
 * Gets the values from an enum.
 * Useful as Object.values() alone will return an object with the enum key => value as well as value => key.
 * This function manages that implementation detail for us.
 */
export function enumValues<T>(anEnum: Record<string, T> | ArrayLike<T>) {
  return Object.values(anEnum).filter((v) => isNaN(Number(v)));
}
