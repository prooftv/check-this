import type { SuperTextSchemaDefinition } from './types';
import { SuperTextInput } from './SuperTextInput';
import { defineField } from 'sanity';

export function defineSuperTextField(
  schemaTypeDefinition: Omit<SuperTextSchemaDefinition, 'type'>,
) {
  return {
    ...schemaTypeDefinition,
    type: 'text',
    components: { input: SuperTextInput },
  } satisfies SuperTextSchemaDefinition;
}
