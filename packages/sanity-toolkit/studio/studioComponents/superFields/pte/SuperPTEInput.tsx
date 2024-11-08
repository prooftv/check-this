import { type CSSProperties } from 'react';
import { Stack, Text } from '@sanity/ui';
import { toPlainText } from '@portabletext/toolkit';
import './SuperPTEInput.css';
import CharacterCount from '../../characterCount/CharacterCount';

import type { SuperPTEInputProps } from './types';

/**
 * PTE with options for character count (with min and max length), initial height, and initial active.
 */
export function SuperPTEInput(props: Readonly<SuperPTEInputProps>) {
  const { value, schemaType } = props;

  const charCount = value ? toPlainText(value).length : 0;

  const { showCount, maxLength, minLength } = schemaType.options ?? {};

  return (
    <Stack space={3}>
      <div
        className="super-pte-container"
        style={
          {
            '--pte-container-height': schemaType.options?.initialHeight ?? 'unset',
          } as CSSProperties
        }
        id={'PTE-height-container'}
      >
        {props.renderDefault({
          ...props,
          initialActive: schemaType.options?.initialActive ?? false,
        })}
      </div>

      {(showCount ?? maxLength ?? minLength) && (
        <Text muted align={'right'} size={1}>
          <CharacterCount charCount={charCount} options={schemaType.options} />
        </Text>
      )}
    </Stack>
  );
}
