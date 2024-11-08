import { RestoreIcon } from '@sanity/icons';
import { Card, Flex, Stack, Text } from '@sanity/ui';
import type { ComponentType } from 'react';
import { IntentButton, type ObjectItemProps } from 'sanity';
import type { PartialLogItem } from '../types';

export const DeletionLogItemComponent: ComponentType<ObjectItemProps<PartialLogItem>> = (
  props,
) => {
  const value = props.value;

  let formattedDate;

  if (!value.deletedAt) {
    formattedDate = 'No deleted date';
  } else {
    const date = new Date(value.deletedAt);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    formattedDate = `${date.getDate()}.${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  return (
    <Card borderTop={props.index > 0}>
      {/* Flex container for "custom" item preview and Intent Button */}
      <Flex justify={'space-between'} align={'center'} gap={2} paddingX={4} paddingY={4}>
        {/* Custom item preview with the document title, type and date */}
        <Stack space={3}>
          <Text weight="semibold">{value.documentTitle}</Text>
          <Text muted size={1}>
            Type: {value.type}
          </Text>

          <Text muted size={1}>
            Deleted: {formattedDate}
          </Text>
          <Text muted size={0}>
            ID: {value.docId}, Revision: {value._key}
          </Text>
        </Stack>

        {/* Intent Button */}
        {value.docId && (
          <IntentButton
            icon={RestoreIcon}
            tone={'positive'}
            mode="ghost"
            intent="edit"
            params={{
              type: value.type,
              id: value.docId,
            }}
            text="Open to restore"
            tooltipProps={{
              placement: 'top',
              content: 'You can restore this document after opening it',
            }}
          />
        )}
      </Flex>
    </Card>
  );
};
