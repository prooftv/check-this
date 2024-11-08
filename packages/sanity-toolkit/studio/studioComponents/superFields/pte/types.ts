import { type ArrayDefinition, type PortableTextInputProps } from 'sanity';
import { type CharCountOptions } from '../../characterCount/types';

/**
 * The available options for a SuperPTE field.
 */
interface SuperPTEOptions extends CharCountOptions {
  initialActive?: boolean;
  initialHeight?: string;
}

/**
 * The schema definition for the SuperPTE field, i.e. within the `defineField({})` call.
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/block-type
 */
export interface SuperPTESchemaDefinition extends ArrayDefinition {
  options?: ArrayDefinition['options'] & SuperPTEOptions;
}

/**
 * The Input Props passed to the component during render.
 */
export interface SuperPTEInputProps extends PortableTextInputProps {
  schemaType: PortableTextInputProps['schemaType'] & {
    options?: PortableTextInputProps['schemaType']['options'] & SuperPTEOptions;
  };
}
