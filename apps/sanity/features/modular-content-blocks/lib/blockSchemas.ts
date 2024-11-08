import { type SchemaTypeDefinition } from 'sanity';

interface SanityBlockSchema {
  schema: SchemaTypeDefinition;
}

const outerBlocksSchema = import.meta.glob<SanityBlockSchema>(
  '../blocks/outer/**/schema.{ts,tsx}',
  { eager: true },
);

const innerBlocksSchema = import.meta.glob<SanityBlockSchema>(
  '../blocks/inner/**/schema.{ts,tsx}',
  { eager: true },
);

export const outerOnlyBlocks = Object.values(outerBlocksSchema)
  .map((block) => block.schema)
  .filter(Boolean);

export const innerOnlyBlocks = Object.values(innerBlocksSchema)
  .map((block) => block.schema)
  .filter(Boolean);

/**
 * The object schema to register with Sanity. This allows us to use our blocks as "type"s when
 * defining fields or array members.
 */
export const blocksObjectSchema: Array<SchemaTypeDefinition> = [
  ...outerOnlyBlocks,
  ...innerOnlyBlocks,
];
