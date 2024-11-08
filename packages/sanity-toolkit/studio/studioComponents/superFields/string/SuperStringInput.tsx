import { type ChangeEvent, useCallback } from 'react';
import { Stack, Text, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';
import CharacterCount from '../../characterCount/CharacterCount';

import type { SuperStringInputProps } from './types';

export const SuperStringInput = (props: SuperStringInputProps) => {
  const { elementProps, onChange, value = '' } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );

  return (
    <Stack space={2}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text align={'right'}>
        <CharacterCount
          charCount={props.value?.length ?? 0}
          options={props.schemaType.options}
        />
      </Text>
    </Stack>
  );
};
