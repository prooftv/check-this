// import { BlockSchemaDefinition } from '../../components/BlockWizard/types/blockSchema';
// import { OuterBlockItemComponent } from '../../components/OuterBlockItemComponent';
// import { InnerBlockItemComponent } from '../../components/InnerBlockItemComponent';
import { innerBlockFieldsets, outerBlockFieldsets } from './blockFieldsets';
import type { BlockSchemaDefinition } from '../../types/BlockSchemaDefinition';

// @todo Add the components for the Item Components

export function defineOuterBlock(schemaTypeDefinition: BlockSchemaDefinition) {
  return {
    ...schemaTypeDefinition,
    type: 'object',
    fieldsets: [...outerBlockFieldsets(), ...(schemaTypeDefinition.fieldsets ?? [])],
    components: {
      ...schemaTypeDefinition.components,
      // item: schemaTypeDefinition.components?.item ?? OuterBlockItemComponent,
    },
  } satisfies BlockSchemaDefinition;
}

export function defineInnerBlock(schemaTypeDefinition: BlockSchemaDefinition) {
  return {
    ...schemaTypeDefinition,
    type: 'object',
    fieldsets: [...innerBlockFieldsets(), ...(schemaTypeDefinition.fieldsets ?? [])],
    components: {
      ...schemaTypeDefinition.components,
      // item: schemaTypeDefinition.components?.item ?? InnerBlockItemComponent,
    },
  } satisfies BlockSchemaDefinition;
}
