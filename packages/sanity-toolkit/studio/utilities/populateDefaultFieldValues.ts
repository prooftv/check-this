import { type ArrayOfObjectsInputProps } from 'sanity';

/**
 * This function is used to populate default field values for a block when programmatically
 * adding it to an array. Without this, default values for fields aren't set by Sanity
 * and can lead to errors.
 * @todo consider handling other jsonType's, rather than just 'object'
 */
export function populateDefaultFieldValues(
  schemaName: string,
  fieldProps: ArrayOfObjectsInputProps,
) {
  let defaultInitialValues = {};

  const schema = fieldProps.schemaType.of.find((schema) => schema.name === schemaName);

  if (schema && schema.jsonType === 'object') {
    defaultInitialValues = schema.fields.reduce((acc, blockField) => {
      const fallbacks: Record<string, unknown> = {
        array: [],
        object: {},
      };

      // Some fields need must have a value to prevent errors when adding content before a page refresh, such as "array"
      const fallbackValue =
        blockField.type.jsonType in fallbacks
          ? fallbacks[blockField.type.jsonType]
          : undefined;

      return {
        ...acc,
        [blockField.name]: blockField.type.initialValue ?? fallbackValue,
      };
    }, {});
  }

  return defaultInitialValues;
}
