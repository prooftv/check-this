import {
  type DocumentActionComponent,
  type SanityDocument,
  useDocumentOperation,
} from 'sanity';
import { readingTime } from '../utilities/readingTime';

/**
 * Sets a field to the total reading time it will take to read the content.
 * Defaults to the `readingTime` field.
 * Specify the function to calculate the total reading time in the second parameter.
 * Specify the field name to set in the third parameter.
 * Setting force to false will only update the field value if it is empty.
 */
export function setReadingTime(
  originalPublishAction: DocumentActionComponent,
  contentLengthFn: (draft: SanityDocument | null) => number,
  fieldName = 'readingTime',
  force = true,
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
        const articleLength = props.draft?.content ? contentLengthFn(props.draft) : 0;

        if (force || !props.draft?.[fieldName]) {
          patch.execute([
            {
              set: { [fieldName]: readingTime(articleLength).estimatedReadingTime },
            },
          ]);
        }

        if (originalResult?.onHandle) {
          originalResult.onHandle();
        }
      },
    };
  };

  return PublishAndUpdateDate;
}
