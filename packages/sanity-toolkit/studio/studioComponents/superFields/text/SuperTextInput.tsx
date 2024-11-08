import { type ChangeEvent, useCallback } from 'react';
import { Stack, Text, TextArea } from '@sanity/ui';
import { set, unset } from 'sanity';
import CharacterCount from '../../characterCount/CharacterCount';

import type { SuperTextInputProps } from './types';

export const SuperTextInput = (props: SuperTextInputProps) => {
  const { elementProps, onChange, value = '' } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );

  return (
    <Stack space={2}>
      <TextArea
        {...elementProps}
        onChange={handleChange}
        value={value}
        style={{ resize: 'vertical' }}
      />
      <Text align={'right'}>
        <CharacterCount
          charCount={props.value?.length ?? 0}
          options={props.schemaType.options}
        />
      </Text>
    </Stack>
  );
};
