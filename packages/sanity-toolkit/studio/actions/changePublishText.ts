import { type DocumentActionComponent } from 'sanity';
import { useMemo } from 'react';

/**
 * Sanity Document Action that replaces the label of the default 'publish' action label with
 * alternate text if the document has already been published.
 *
 * Defaults to "Update".
 */
export function changePublishText(
  originalPublishAction: DocumentActionComponent,
  newUpdateText = 'Update',
) {
  const PublishAndUpdateDate: DocumentActionComponent = (props) => {
    const originalResult = originalPublishAction(props);

    const isPublished = useMemo(
      () => props.published || !props.draft,
      [props.draft, props.published],
    );

    return {
      ...originalResult,

      label: isPublished ? newUpdateText : (originalResult?.label ?? 'Publish'),
    };
  };

  return PublishAndUpdateDate;
}
