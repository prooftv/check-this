import { type FieldDefinitionBase, SlugDefinition, SlugOptions } from 'sanity';

export type PathnameParams = Omit<
  SlugDefinition & FieldDefinitionBase,
  'type' | 'options' | 'name'
> & {
  name?: string;
  options?: SlugOptions;
};
