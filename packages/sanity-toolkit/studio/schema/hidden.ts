import type { ConditionalPropertyCallbackContext } from 'sanity';

type ConditionalPropertyCallbackContextOverride = Omit<
  ConditionalPropertyCallbackContext,
  'parent'
> & {
  parent: Record<string, unknown>;
};

/**
 * Custom hidden functions for use with the `hidden` field in a Sanity schema type.
 *
 * e.g.:
 *   {
 *     hidden: ifParentIsNot('type', 'article'),
 *   }
 */
export function ifParentIsNot(fieldName: string, fieldValue: unknown) {
  return ({ parent }: { parent: Record<string, unknown> }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!parent) {
      return false;
    }
    return Array.isArray(fieldValue)
      ? !fieldValue.includes(parent[fieldName])
      : parent[fieldName] !== fieldValue;
  };
}

/**
 * Custom hidden functions for use with the `hidden` field in a Sanity schema type.
 *
 * e.g.:
 *   {
 *     hidden: ifParentIs('type', 'article'),
 *   }
 */
export function ifParentIs(fieldName: string, fieldValue: unknown) {
  return ({ parent }: { parent: Record<string, unknown> }) => {
    return !ifParentIsNot(fieldName, fieldValue)({ parent });
  };
}

export function ifParentArrayEmpty(fieldName: string) {
  return ({ parent }: ConditionalPropertyCallbackContextOverride) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!parent) {
      return false;
    }
    const parentFieldValue = parent[fieldName];

    return Array.isArray(parentFieldValue) ? parentFieldValue.length === 0 : true; // If field not yet initialised, it will be undefined, so we want it hidden
  };
}

export function ifParentArrayNotEmpty(fieldName: string) {
  return (context: ConditionalPropertyCallbackContextOverride) => {
    return !ifParentArrayEmpty(fieldName)(context);
  };
}
