export const SINGLETON_DOC_PREFIX = `singleton`;

export const PRIVATE = true;
export const NOT_PRIVATE = false;

/**
 * Used to get the singleton document ID for a particular schema type.
 * This ensures a consistent document ID for a particular singleton.
 * It can also ensure a singleton is public, even if it has a dot in its schema type name.
 */
export function singletonDocId(schemaType: string, isPrivate = false) {
  const singletonDocId = `${SINGLETON_DOC_PREFIX}-${schemaType}`.replaceAll(' ', '-'); // IDs with spaces in are not valid, so remove them.

  if (!isPrivate) {
    return singletonDocId.replaceAll('.', '_'); // Document id's with a dot in are made private by default, so remove that for this utility.
  }

  return singletonDocId;
}
