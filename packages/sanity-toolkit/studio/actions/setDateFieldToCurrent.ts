import { type DocumentActionComponent, useDocumentOperation } from 'sanity';

/**
 * Set a field with the current date when a document is published.
 * If the field already has a value, it will not be overridden.
 * Defaults to the `publishedAt` field.
 * Specify the field name to set in the second parameter.
 * Set force to true to update the field value even if it already has a value.
 */
export function setDateFieldToCurrent(
  originalPublishAction: DocumentActionComponent,
  fieldName = 'publishedAt',
  force = false,
) {
  const PublishAndUpdateDate: DocumentActionComponent = (props) => {
    const originalResult = originalPublishAction(props);

    const { patch } = useDocumentOperation(props.id, props.type);

    if (!originalResult) {
      return originalResult;
    }

    return {
      ...originalResult,

      onHandle: () => {
        if (force || !props.draft?.[fieldName]) {
          patch.execute([{ set: { [fieldName]: new Date().toISOString() } }]);
        }

        if (originalResult?.onHandle) {
          originalResult.onHandle();
        }
      },
    };
  };

  return PublishAndUpdateDate;
}
