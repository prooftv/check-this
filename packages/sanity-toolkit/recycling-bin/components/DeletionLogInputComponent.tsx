import { RemoveCircleIcon } from '@sanity/icons';
import { Button, Stack } from '@sanity/ui';
import { type ComponentType, useMemo } from 'react';
import { type ArrayOfObjectsInputProps, useFormValue } from 'sanity';
import type { PartialLogItem } from '../types';
import { useRecyclingBin } from '../hooks';

interface Options {
  apiVersion?: string;
}

/**
 * An Array Input Component that removes restored documents from the logs array.
 *
 * Optionally pass in an apiVersion to configure the client.
 */
export function DeletionLogInputComponentFn({ apiVersion = '2024-10-24' }: Options) {
  const DeletionLogInputComponent: ComponentType<ArrayOfObjectsInputProps<PartialLogItem>> = (
    props,
  ) => {
    const { cleanUp } = useRecyclingBin({ apiVersion });

    /** The recycling bin document ID. */
    const documentId = useFormValue(['_id']) as string;
    const recycledDocumentIDs = useMemo(
      () => [...new Set(props.value?.map((recycledDocument) => recycledDocument.docId) ?? [])],
      [props.value],
    );

    return (
      <Stack space={4}>
        <Button
          text="Remove restored Document from Logs"
          icon={RemoveCircleIcon}
          onClick={() => cleanUp(documentId, recycledDocumentIDs)}
          mode="ghost"
        />

        {/* Remove the Add Item button below the Array Input via arrayFunction: () */}
        {props.renderDefault({ ...props, arrayFunctions: () => null })}
      </Stack>
    );
  };

  return DeletionLogInputComponent;
}
