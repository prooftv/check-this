import type { SchemaValidationValue, TextDefinition, TextInputProps } from 'sanity';
import type { CharCountOptions } from '../../characterCount/types';

/**
 * The available options for a SuperText field.
 */
type SuperTextSchemaOptions = CharCountOptions;

/**
 * The schema definition for the SuperText field, i.e. within the `defineField({})` call.
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/text-type
 */
export interface SuperTextSchemaDefinition extends Omit<TextDefinition, 'validation'> {
  options?: TextDefinition['options'] & SuperTextSchemaOptions;
  validation?: SchemaValidationValue /** This fixes error "ValidationBuilder<TextRule, string> | undefined is not assignable to type SchemaValidationValue" */;
}

/**
 * The Input Props passed to the component during render.
 */
export interface SuperTextInputProps extends TextInputProps {
  schemaType: TextInputProps['schemaType'] & {
    options?: TextInputProps['schemaType']['options'] & SuperTextSchemaOptions;
  };
}
